var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('./utils');


router.get('/test1/:email', async function (req, res) {
 //console.log('dfd')
 
    var user = await utils.Searchuser(req.params);
    console.log(user)
    if (user) {
        console.log('hay user',user)
        return res.json({ user: user.toAuthJSON() })
    }
    else {
        console.log('no hay user ERROR')
        return res.status(422).json('error in search');
    }


})

router.get('/test2/:email', async function (req, res) {
    var user = await User.findOne(req.params);
    if (user) {
        console.log('TEST2 USER' , user)
        return res.json({ user: user.toAuthJSON() })
    }
    else {
        return res.status(422).json('error in search');
    }

})

module.exports = router;