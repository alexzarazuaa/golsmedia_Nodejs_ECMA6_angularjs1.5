
let router = require('express').Router();
let ProfileUtils = require('../utils/ProfileUtils');


router.post('/karma/increase/user/id/:id/:qty', async(req, res, next) => {
    try {
        await ProfileUtils.increaseKarmaByUserId(req.params.id, req.params.qty);
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});


module.exports = router;