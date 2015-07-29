var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

//for adding new products as seller in dashboard
router.post('/products', function(req, res){
	// console.log("USER: ", User)
 //    console.log("PRODUCT: ", Product)
 	var productToAdd = req.body;
 	productToAdd.company = req.user.company;

	Product.create(productToAdd).then(function(createdProduct){
		User.findByIdAndUpdate(req.user._id, { $push: {'productsForSale': createdProduct} }, function(){
			res.end()
		})
	})
})

//for showing products for sale by seller in dashboard
router.get('/products', function(req, res){
	User.findById(req.user._id).exec()
		.then(function(user){
			//return Promise.all(user.productsForSale)
			return Product.find({
				'_id': {
					$in: user.productsForSale
				}
			}).exec()
		})
		.then(function(products){
			res.send(products)
		})
})


//for editing exisiting products as seller in dashboard
router.put('/products/:id', function(req, res){

	console.log('updating product')
	console.log('req.user: ', req.user)
	console.log('req.body: ', req.body)
	
	Product.findOneAndUpdate({_id: req.params.id}, req.body).exec()
		.then(function(updatedProduct){
			res.send(updatedProduct)
		})
}) 

// //for deleting products as seller in dashboard
// router.delete('/products', function(req, res){
// 	console.log('deleting product')
// 	console.log(req.body.data)
// 	//we should change the User model to be an array of products, not product ids
// 	User.find({user_name: req.body.data.user_name}).exec()
// 	.then(function(user){
// 		console.log(user.productsForSale)
// 		user.productsForSale.find({name: req.body.data.product.name}).exec().then(function())
// 	}) 