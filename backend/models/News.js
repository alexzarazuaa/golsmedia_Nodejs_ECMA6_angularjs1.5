var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var NewsSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  //PONER TAMBIEN IMAGENES PARA CUANDO SUBA LAS NOTICIAS HAYAN IMAGENES.
  body: String,
  world:String,
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

NewsSchema.plugin(uniqueValidator, {message: 'is already taken'});

NewsSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

NewsSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

NewsSchema.methods.updateFavoriteCount = function() {
  var news = this;

  return User.count({favorites: {$in: [news._id]}}).then(function(count){
    news.favoritesCount = count;

    return news.save();
  });
};

NewsSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    world:this.world,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('News', NewsSchema);
