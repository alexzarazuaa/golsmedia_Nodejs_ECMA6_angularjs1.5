let mongoose = require('mongoose');
let User = mongoose.model('User');

exports.Searchuser = async function(email){
    //console.log(email);
    let user = await User.findOne(email);
    return user;
}