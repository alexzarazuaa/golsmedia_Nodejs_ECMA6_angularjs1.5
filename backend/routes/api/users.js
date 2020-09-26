var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401).json('The user was not Registered yet');
      }

      return res.json({ user: user.toAuthJSON() });
    }).catch(next);
});


router.put('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401).json('The user was not found'); }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});


router.post("/users/register", function (req, res, next) {
  User.find({
    $or: [{ email: req.body.user.email }, { username: req.body.user.username }],
  }).then(function (user) {
      //console.log("user register",user);
    if (user[0]) {
      return res.status(422).json("The email or username are already created");
    } else {
      var user = new User();
      user.idsocial = req.body.user.username;
      user.username = req.body.user.username;
      user.email = req.body.user.email;
      user.type = "client";
      user.setPassword(req.body.user.password);
      user
        .save()
        .then(function () {
          return res.json({ user: user.toAuthJSON() });
        })
        .catch(next);
    }
  });
});



router.post('/users', function (req, res, next) {
  var user = new User();

  user.idsocial = req.body.user.username;
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  // user.type = "client";
  user.setPassword(req.body.user.password);

  user.save().then(function () {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

//socialLogin

router.post("/users/sociallogin", function (req, res, next) {
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = JSON.parse(sessions[key]).passport.user;
  }

  User.find({ _id: sessionUser }, function (err, user) {
    user = user[0];

    if (err) return done(err);
    // if the user is found then log them in
    // console.log('ee')
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() }); // user found, return that user
    } else {
      return res.status(422).json(err);
    }
  });
});

router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
})
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);



router.get("/auth/github", passport.authenticate("github"));//auth github
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);

module.exports = router;
