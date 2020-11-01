var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;


var UserSchema = new mongoose.Schema({
    idsocial: { type: String, unique: true },
    username: String,
    email: String,
    image: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followersCount: { type: Number, default: 0 },
    hash: String,
    salt: String,
    type: String,
    karma : { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema)

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.toAuthJSON = function() {
    return {
        idsocial: this.idsocial,
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image,
        following: this.following,
        type: this.type,
        karma : this.karma
    };
};

UserSchema.methods.toProfileJSONFor = function(user) {
    return {
        idsocial: this.idsocial,
        username: this.username,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: user ? user.isFollowing(this._id) : false,
        karma : this.karma
    };
};

UserSchema.methods.favorite = function(id) {
    if (this.favorites.indexOf(id) === -1) {
        this.favorites = this.favorites.concat([id]);
    }

    return this.save();
};

UserSchema.methods.unfavorite = function(id) {
    this.favorites.remove(id);
    return this.save();
};

UserSchema.methods.isFavorite = function(id) {
    return this.favorites.some(function(favoriteId) {
        return favoriteId.toString() === id.toString();
    });
};

//follow,unfollow,isfollowing
UserSchema.methods.follow = function(id) {
    if (this.following.indexOf(id) === -1) {
        this.following = this.following.concat([id]);
    }
    return this.save();
};

UserSchema.methods.unfollow = function(id) {
    this.following.remove(id);
    return this.save();
};

UserSchema.methods.isFollowing = function(id) {
    return this.following.some(function(followId) {
        return followId.toString() === id.toString();
    });
};



// UserSchema.methods.updatefollowersCount =  () => {
//     var user = this;

  
//     return User.count({ following: { $in: [user._id] } }).then(function (count) {
   
//       user.followersCount = count;
  
//       return user.save();
//     })
//   };
  


mongoose.model('User', UserSchema);


