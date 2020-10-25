let mongoose = require('mongoose');
const User = mongoose.model('User');
const News = mongoose.model('News');


exports.updateKarma = async (user, qty) => {
    let profile = user.profile;

     profile = await Profile.findOneAndUpdate({ _id: profile }, { $inc: { karma: qty } }, { "fields": { karma: 1 }, new: true });
    if (profile.karma < 0) {
        profile.karma = 0;
        await profile.save();
    }
}


/**
 * @param {String} id - User id
 * @param {Number} qty - Quantity to update
 */
exports.increaseKarmaByUserId = async  (id, qty) => {
    var user = await User.findById(id, { profile: 1 });
    if (user)
        updateKarma(user, qty);
}

