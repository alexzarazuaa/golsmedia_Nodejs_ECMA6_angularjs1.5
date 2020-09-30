var router = require('express').Router();
var mongose = require('mongoose');
var News = mongose.model('News');

router.get('/',function(req,res,next) {
    News.find().distinct('world').then(function(world){
        return res.json({world: world});
    }).catch(next)
})

module.exports = router;