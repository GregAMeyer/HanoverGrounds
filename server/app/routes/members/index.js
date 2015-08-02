'use strict';
var router = require('express').Router();
module.exports = router;
//var _ = require('lodash');
//added for signing up line 20
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

//for showing all users who have accounts
router.get('/', function(req, res){
    //console.log('in the get request route')
    User.find().exec()
        .then(function(users){
            //console.log(users)
            res.json(users)
        })
})
//for displaying the items in the user's cart
router.get('/cart', function(req, res){
    //console.log('in the get request route', req.user._id)
    User.findById(req.user._id).exec()
        .then(function(user){
            //user.cart is an array of ids
            //Product.find each id
            return Product.find({
                '_id': {
                    $in: user.cart
                }
            }).exec()
        }).then(function(productsInUsersCart){
            res.send(productsInUsersCart)
        })
})
//for displaying the items in the user's cart
router.post('/cart', function(req, res){
    var productToAddToCart = req.body;
    console.log('adding this product ID?: ', productToAddToCart)
    console.log('adding to this user iD?: ', req.user._id)
    User.findByIdAndUpdate(req.user._id, { $push: {'cart': productToAddToCart} }, function(){
            res.end()
        })
})
//for deleting an item in the user's cart
router.delete('/cart/:id', function(req, res){
    var productToRemoveFromCart = req.params.id;
    User.findByIdAndUpdate(req.user._id, { $pull: {'cart': productToRemoveFromCart} }, function(){
        User.findById(req.user._id).exec().then(function(user){
            res.end();
        })
    })
})

//from the signup page
router.post('/', function(req, res){
    User.create(req.body).then(function(createdUser){
        res.end()
    })
    .then(null, next);
});
//for determing the state to go to upon login
router.post('/loggedInUser', function(req,res,next){
    User.findOne({email: req.body.email}).exec()
        .then(function(user){
            console.log('UESR', user)
            res.send(user)
        })
})


// var ensureAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };
//////////////////////example to follow/////////////////////






