
let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let utils = require('./utils');

////////////////////////////////////////////////////////////////////
//get http://0.0.0.0:3000/test/test_search/test2/alexzs@gmail.com //
////////////////////////////////////////////////////////////////////


router.get('/test1/:email', async function (req, res) {
 console.log('dfd')
 
    let user = await utils.Searchuser(req.params);
    console.log(user)
  
    user
    ? (() => {
        console.log('hay user',user)
        return res.json({ user: user.toAuthJSON() })
    })()
    : (() => {
        console.log('no hay user ERROR')
        return res.status(422).json('error in search');
    })()


})

router.get('/test2/:email', async function (req, res) {
    let user = await User.findOne(req.params);

    user
    ? (() => {
        console.log('hay user TEST2',user)
        return res.json({ user: user.toAuthJSON() })
    })()
    : (() => {
        console.log('no hay user ERROR')
        return res.status(422).json('error in search');
    })()
})

module.exports = router;