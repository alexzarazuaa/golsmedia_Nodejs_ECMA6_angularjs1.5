var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'News' }
}, { timestamps: true });

// Requires population of author
CommentSchema.methods.toJSONFor = function(user) {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        author: this.author.toProfileJSONFor(user)
    };
};

mongoose.model('Comment', CommentSchema);