let mongoose = require('mongoose');
let User = mongoose.model('User');

exports.Searchuser = async function(email){
    console.log(email);
    console.log('entra utils')
    var user = await User.findOne({'email':email});
    console.log(`utils user`,user)
    return user;
}