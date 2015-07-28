var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

//for adding new products as seller in dashboard
router.post('/products', function(req, res){

	// console.log("USER: ", User)
 //    console.log("PRODUCT: ", Product)
	Product.create(req.body).then(function(createdProduct){
		console.log('createdProduct', createdProduct)
		res.end()
	})

	// User.findOne({
	// 	user_name: req.body.user_name
	// }).exec().then(function(seller){
	// 	seller.productsForSale.push(req.body.data.product)
	// 	res.status(201).send()
	// })
})

// //from the signup page
// router.post(function(req, res, next){
// 	console.log("hitting users route")
// 	User.create(req.body)
// 	.then(function(createdUser){
// 		res.json(createdUser);
// 	})
// 	.then(null, next);
// });



//for editing exisiting products as seller in dashboard
router.put('/products', function(req, res){
	console.log('updating product')
	console.log(req.body)
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