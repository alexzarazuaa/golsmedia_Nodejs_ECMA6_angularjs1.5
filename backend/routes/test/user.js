
let router = require('express').Router();
let UsersUtils = require('../utils/UsersUtils');


router.post('/karma/increase/user/id/:id/:qty', async(req, res, next) => {
    console.log('entra en increase')
    try {
        await UsersUtils.increaseKarmaByUserId(req.params.id, req.params.qty);
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});


module.exports = router;