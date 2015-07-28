'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

//for getting products in home page and other pages
router.use('/products', require('./products'));

//for getting products for sale in dashboard
router.use('/dashboard', require('./dashboard'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
