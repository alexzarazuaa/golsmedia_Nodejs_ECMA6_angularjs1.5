var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');
var Opinions = mongoose.model('Opinions');


//PONER TAMBIEN IMAGENES PARA CUANDO SUBA LAS NOTICIAS HAYAN IMAGENES.
var NewsSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    description: String,
    body: String,
    world: String,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    opinions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opinions' }],
    CommentsCount: { type: Number, default: 0 },
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });



NewsSchema.plugin(uniqueValidator, { message: 'is already taken' });

NewsSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});

NewsSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

NewsSchema.methods.updateFavoriteCount = function () {
    var news = this;

    return User.count({ favorites: { $in: [news._id] } }).then(function (count) {
        news.favoritesCount = count;

        return news.save();
    });
};



NewsSchema.methods.toJSONFor = function (user) {
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        body: this.body,
        world: this.world,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        tagList: this.tagList,
        favorited: user ? user.isFavorite(this._id) : false,
        favoritesCount: this.favoritesCount,
        comments: this.comments,
        CommentsCount: this.CommentsCount,
        opinions:this.opinions,
        author: this.author.toProfileJSONFor(user)
    };
};



mongoose.model('News', NewsSchema);