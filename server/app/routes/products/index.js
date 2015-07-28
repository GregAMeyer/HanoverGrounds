var router = require('express').Router();
module.exports = router;
var Product = require('../../../db/models/productModel.js');
var bodyParser = require('body-parser');


router.get('/products', function(req, res, next){
	Product.find({}).exec()
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});

router.get('/products/:id', function(req, res, next){
	Product.findById(req.params.id).exec()
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});

router.post('/products', function(req, res, next){
	Product.create(req.body)
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});

router.delete('/products/:id', function(req, res, next){
	//need to look at req.body and make sure we are removing the correct property
	req.body.remove()
	.then(function(product){
		res.status(204).end();
	})
	.then(null, next);
});

router.put('/products/:id', function(req, res, next){
	Product.findById(req.params.id).exec()
	.then(function(data){
		//SET THE CHANGES HERE
		//DO A SAVE
	})
	.then(null, next);
});

