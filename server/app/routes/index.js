'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.get('/products') //for getting products in dashboard or anywhere else
router.post('/products') //for adding new products as admin in dashboard
router.put('/products') //for editing exisiting products as admin in dashboard
router.delete('/products') //for deleting products as admin in dashboard

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
