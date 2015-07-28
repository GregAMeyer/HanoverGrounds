'use strict';
var router = require('express').Router();
module.exports = router;
var Product = require('../../db/models/productModel.js');
var User = require('../../db/models/userModel.js');


router.use('/members', require('./members'));

//for getting products in home page and other pages
router.use('/api/products', require('./products'));

//for getting products for sale in dashboard
router.use('/api/products', require('./dashboard'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
