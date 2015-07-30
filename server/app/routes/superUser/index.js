var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
// //for showing all users who have accounts
// router.get('/users', function(req, res){
// 	User.find().exec()
// 		.then(function(users){
// 			res.send(users)
// 		})
// })

//for editing exisiting user
router.put('/users/:id', function(req, res){

	User.findOneAndUpdate({_id: req.params.id}, req.body).exec()
		.then(function(updatedUser){
			res.send(updatedUser)
		})
})

//getting all products as admin/superuser
// router.get('/products', function(req, res){
// 	Product.find().exec()
// 		.then(function(product){
// 		console.log('PRODUCT!@#!@#', product)
// 			res.send(product)
// 		})
// })

//for deleting exisiting user
router.delete('/users/:id', function(req, res){
	
	User.findByIdAndRemove(req.params.id).exec()
		.then(function(removedUser){
			res.send(removedUser)
		})
}) 
