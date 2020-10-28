let mongoose = require('mongoose');
const User = mongoose.model('User');
const News = mongoose.model('News');
let utils = require('../test/utils');


//function isAdmin
// exports.IsAdminUser = async function(id) {
//     console.log('entra IS ADMIN')
//     let user = await User.findById(id).populate('type');
//     console.log('-----USER FIND--',user)
//     return user.isAdmin();
// }

async function updateKarma(user, qty) {
    var user = user;

    console.log('KAAAAAAAAAARMA----------------------',user)

    var user = await User.findOneAndUpdate({ _id: user.id}, { $inc: { karma: qty } }, { "fields": { karma: 1 }, new: true });
    if (user.karma < 0) {
        user.karma = 0;
        await user.save();
    }
}


/**
 * @param {String} id - User id
 * @param {Number} qty - Quantity to update
 */
exports.increaseKarmaByUserId = async  (id, qty) => {
    let user = await User.findById(id);
    if (user)
        updateKarma(user, qty);
}

