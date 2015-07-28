var router = require('express').Router();
module.exports = router;
var Product = require('../../db/models/productModel.js');
var User = require('../../db/models/userModel.js');

//for adding new products as seller in dashboard
router.get('/products')