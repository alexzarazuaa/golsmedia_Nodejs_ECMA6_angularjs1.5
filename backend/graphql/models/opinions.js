let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let slug = require('slug');
//let User = mongoose.model('User');

let OpinionsSchema = new mongoose.Schema({
    slug: { type: String, unique: true },
    type: String,
    category:String,
    description:String,
    body:String,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishDate:String
}, {
    timestamps: true,
    usePushEach: true

});

OpinionsSchema.plugin(uniqueValidator, { message: 'is already taken' });

OpinionsSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

OpinionsSchema.methods.slugify = function () {
    this.slug = slug(this.type) + '#' + Math.floor(1000 + Math.random() * 9000);
};

OpinionsSchema.methods.toJSONFor = function (user) {
    return {
        slug : this.slug,
        id : this.id,
        type:this.type,
        category:this.category,
        description:this.description,
        body:this.body,
        user:this.user.toProfileJSONfor(user),
        publishDate:this.publishDate
    }, {
        timestamps: true,
        usePushEach: true
    }
};

mongoose.model('Opinion', OpinionsSchema);