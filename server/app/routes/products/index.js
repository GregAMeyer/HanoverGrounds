var router = require('express').Router();
var mongoose = require('mongoose');
require('../../../db/models');
var Product = mongoose.model('Product');
var Reviews = mongoose.model('Reviews');
var Categories = mongoose.model('Categories');


var ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).end();
	}
};


//for dashboard-side products routing////////////////////////////////



//for dashboard-side products routing/////////////////////////////////


//for adding new products as seller in dashboard
router.post('/', function(req, res) {
	//should authenticate here based on isSeller before making post to DB
	var productToAdd = req.body;
	console.log('ROUTER USER', req.user)
	productToAdd.seller = req.user._id
	Product.create(productToAdd).then(function(createdProduct) {
		res.json(createdProduct)
	})
})
//for showing products for sale by seller in dashboard
router.get('/seller', function(req, res) {
	Product.find({
		seller: req.user._id
	})
		.then(function(products) {
			res.json(products);
		})
})
//for editing exisiting products as seller in dashboard
//should authenticate here based on isSeller before making post to DB
router.put('/seller/:id', function(req, res) {
	Product.findOneAndUpdate({
		_id: req.params.id
	}, req.body).exec()
		.then(function(updatedProduct) {
			res.send(updatedProduct)
		})
})
///////////////////////////////////////////////////////////////////////



//for user-side and superUser-side products routing///////////////////////////////////////
router.get('/', function(req, res, next) {
	Product.find({}).exec()
		.then(function(products) {
			res.json(products);
		})
		.then(null, next);
});

router.get('/:id', function(req, res, next) {
	//console.log(req.params)
	Product.findById(req.params.id).exec()
		.then(function(product) {
			res.json(product);
		})
		.then(null, next);
});

router.get('/reviews/:id', function(req, res) {
	Reviews.find({
		product: req.params.id
	}).exec()
		.then(function(reviews) {
			res.json(reviews)
		})
})

router.get('/categories/:id', function(req, res) {
	Product.findById(req.params.id)
		.populate('categories')
		.exec(function(err, products) {
			if (err) throw new Error(err)
			res.json(products.categories);
		})
})
router.use('/', ensureAuthenticated)
router.post('/reviews/:id', function(req, res) {
	Reviews.create({
		product: req.params.id,
		review: req.body.review,
		rating: req.body.rating,
		user: req.user.email
	})
		.then(function(review) {
			res.json(review)
		})

})

router.delete('/reviews/:id', function(req, res) {
	Reviews.remove({
		_id: req.params.id
	})
		.then(function() {
			res.end()
		})
});



////////////////////////////////////////////////////////////////////////



module.exports = router;