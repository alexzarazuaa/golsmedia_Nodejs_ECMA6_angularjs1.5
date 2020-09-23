var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var socialKeys = require('../key/apiKey.json');
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

//serializeUser
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//deserializeUser
passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});


//PASSPORT GITHUB STRATEGY
passport.use(new GithubStrategy({
  clientID: socialKeys.GITHUB_CLIENT_ID,
  clientSecret: socialKeys.GITHUB_CLIENT_SECRET,
  callbackURL: socialKeys.GITHUB_CALLBACK,
  scope: 'user:email',
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({idsocial:profile.id.toString()}, function(err, user) {
        console.log(profile);
        if (err)
          return done(err);
        // if the user is found then log them in
        if (user) {
            return done(null, user);
        } else {
          if(!profile.emails[0].value){
            return done("The email is private");
          }else{
            var user = new User({
                idsocial: profile.id,
                username: profile.username,
                type: "client",
                email: profile.emails[0].value,
                image: profile.photos[0].value,
            });
            user.save(function(err) {
                //if(err){
                  console.log(err);
                    return done(null, user);
                //}
            });
          }
      }
    });
  }
));

