var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var OpinionSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    type: String,
    category: String,
    description: String,
    body: String,
    publishDate: String,
}, { timestamps: true });
// console.log(OpinionSchema)
OpinionSchema.plugin(uniqueValidator, { message: 'is already taken' });

OpinionSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});

OpinionSchema.methods.slugify = function () {
    this.slug = slug(this.type) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

};

OpinionSchema.methods.toJSONFor = function (user) {
    return {
        slug: this.slug,
        type: this.type,
        category: this.category,
        description: this.description,
        body: this.body,
        publishDate: this.publishDate,
    };
};
mongoose.model('Opinios', OpinionSchema); 