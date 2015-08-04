var router = require('express').Router();
var mongoose = require('mongoose');
require('../../../db/models');
var Product = mongoose.model('Product');
var Reviews = mongoose.model('Reviews');

var ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).end();
	}
};

router.post('/', function(req, res) {
	var productToAdd = req.body;
	productToAdd.seller = req.user._id
	Product.create(productToAdd).then(function(createdProduct) {
		res.json(createdProduct)
	})
})

router.get('/seller', function(req, res) {
	Product.find({
		seller: req.user._id
	})
		.then(function(products) {
			res.json(products);
		})
})

router.put('/seller/:id', function(req, res) {
	Product.findOneAndUpdate({
		_id: req.params.id
	}, req.body).exec()
		.then(function(updatedProduct) {
			res.send(updatedProduct)
		})
})


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

router.get('/:id', function(req, res, next) {
	Product.findById(req.params.id).exec()
		.then(function(product) {
			res.json(product);
		})
		.then(null, next);
});

router.get('/', function(req, res, next) {
	Product.find({}).exec()
		.then(function(products) {
			res.json(products);
		})
		.then(null, next);
});

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
	Reviews.findOne({
		_id: req.params.id

	}).exec()
		.then(function(review) {
			if (review.user === req.user.email || req.user.isSuperUser) {
				return;
			} else throw new Error();
		})
		.then(function() {
			return Reviews.remove({
				_id: req.params.id
			});
		})

	.then(function() {
		res.end()
	})


});


module.exports = router;