var router = require('express').Router();
var mongoose = require('mongoose');
require('../../../db/models');
var Product = mongoose.model('Product');

//var imagePath = '../../views/images';

router.get('/', function(req, res, next){
	console.log("hitting products route")
	Product.find({}).exec()
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});

router.get('/:id', function(req, res, next){
	Product.findById(req.params.id).exec()
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});

router.post('/', function(req, res, next){
	Product.create(req.body)
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});

router.delete('/:id', function(req, res, next){
	//need to look at req.body and make sure we are removing the correct property
	req.body.remove()
	.then(function(product){
		res.status(204).end();
	})
	.then(null, next);
});

router.put('/:id', function(req, res, next){
	Product.findById(req.params.id).exec()
	.then(function(data){
		//SET THE CHANGES HERE
		//DO A SAVE
	})
	.then(null, next);
});

module.exports = router;
