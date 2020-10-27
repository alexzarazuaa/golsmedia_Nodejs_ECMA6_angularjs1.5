var router = require('express').Router();
var mongoose = require('mongoose');
var News = mongoose.model('News');

// return a list of tags
router.get('/', async (req, res, next) => {
  let tags = await News.find().distinct('tagList');

    console.log(tags);
    return res.json({tags: tags});

});

module.exports = router;
