var router = require('express').Router();
module.exports = router;
var Product = require('../../../db/models/productModel.js');
var User = require('../../../db/models/userModel.js');

//for adding new products as seller in dashboard
router.post('/products', function(req, res){
	console.log('adding product')
	console.log('stuffffff', req.body)

	Product.create(req.body)

	User.findOne({
		user_name: req.body.data.user_name
	}).exec().then(function(seller){
		seller.productsForSale.push(req.body.data.product)
		res.status(201).send()
	})
})

//for editing exisiting products as seller in dashboard
router.put('/products', function(req, res){
	console.log('updating product')
	console.log(req.body.data)
	// User.findOneAndUpdate({
	// 	user_name: req.body.data.user_name,
	// 	//productsForSale[productId]: req.body.data.productId
	// },{
	// 	//seller.productsForSale[productId] = req.body.data.product)
	// })
	res.status(201).send()
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