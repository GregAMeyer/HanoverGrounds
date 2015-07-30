var router = require('express').Router();
var mongoose = require('mongoose');
require('../../../db/models');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
//for dashboard-side products routing/////////////////////////////////

//for adding new products as seller in dashboard
router.post('/', function(req, res){
 	var productToAdd = req.body;
 	productToAdd.company = req.user.company;
	Product.create(productToAdd).then(function(createdProduct){
		User.findByIdAndUpdate(req.user._id, { $push: {'productsForSale': createdProduct} }, function(){
			res.end()
		})
	})
})
//for showing products for sale by seller in dashboard
router.get('/seller', function(req, res){
	User.findById(req.user._id).exec()
		.then(function(user){
			return Product.find({
				'_id': {
					$in: user.productsForSale
				}
			}).exec()
		}).then(function(products){
			res.send(products)
		})
})
//for editing exisiting products as seller in dashboard
router.put('/seller/:id', function(req, res){
	Product.findOneAndUpdate({_id: req.params.id}, req.body).exec()
		.then(function(updatedProduct){
			res.send(updatedProduct)
		})
}) 
///////////////////////////////////////////////////////////////////////



//for user-side and superUser-side products routing///////////////////////////////////////
router.get('/', function(req, res, next) {
	Product.find({}).exec()
		.then(function(products) {
			console.log(products)
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

router.put('/:id/reviews', function(req,res,next){
	//assuming only logged in users can use this
	//if (req.user){}
	Product.findById(req.params.id).exec()
	.then(function(product){
		product.reviews.push({review: req.body.review, user: req.user.email});
		product.save(function(err, product){
			if (err) console.log(err);
			res.json(product.reviews)
		})
	}) 
	.then(null, next);
})

////////////////////////////////////////////////////////////////////////


module.exports = router;