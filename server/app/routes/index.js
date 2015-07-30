'use strict';
var router = require('express').Router();
module.exports = router;

//for doign anything related to users
router.use('/members', require('./members'));

//for getting products, editing, or updating
router.use('/products', require('./products'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
