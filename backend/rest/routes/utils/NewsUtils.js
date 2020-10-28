let mongoose = require("mongoose");
let Comment = mongoose.model('Comment');


/**export function for  delete the comments when we delete the new */
exports.DeleteNews = async function(news) {
    news.comments.forEach(async function(element) {
        await Comment.findById(element).remove().exec();
    });
    news.save();

    return news.remove();
}// end_DeleteNews