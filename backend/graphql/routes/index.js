var router = require('express').Router();


router.use('/api', require('./api'));
//test_search
//router.use('/test',require('./test'));



module.exports = router;
