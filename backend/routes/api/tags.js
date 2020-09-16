var router = require('express').Router();
var mongoose = require('mongoose');
var News = mongoose.model('News');

// return a list of tags
router.get('/', function(req, res, next) {
  News.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
