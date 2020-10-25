let mongoose = require('mongoose');
const User = mongoose.model('User');
const News = mongoose.model('News');
let utils = require('../test/utils');

//function isAdmin
exports.IsAdminUser = async function(id) {
    console.log('entra IS ADMIN')
    let user = await User.findById(id).populate('type');
    console.log('-----USER FIND--',user)
    return user.isAdmin();
}

