let router = require('express').Router();

router.use('/test_search',require('./test_search'));
router.use('/fake', require('./fake'));
router.use('/profiles', require('./profile'));


module.exports = router;