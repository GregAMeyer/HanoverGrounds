'use strict';
var router = require('express').Router();
module.exports = router;
//var _ = require('lodash');
//added for signing up line 20
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

//for displaying the items in the user's cart
router.get('/cart', function(req, res){
    if(req.isAuthenticated()){
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
        }
    else{
        Product.find({
                    '_id': {
                        $in: req.session.cart
                    }
                }).exec()
                .then(function(productsInUsersCart){
                    res.send(productsInUsersCart)
            })
    }
})
//for displaying the items in the user's cart
router.post('/cart', function(req, res){
    if(req.isAuthenticated()){
        var productToAddToCart = req.body;
        User.findByIdAndUpdate(req.user._id, { $push: {'cart': productToAddToCart} }, function(){
                res.end()
            })
    }
    else{
        //for NOT logged in users
        // req.session.cart mut be made the second a visitor gets to the site
        req.session.cart.push(req.body)
        res.end();
    }
})
//for deleting an item in the user's cart
router.delete('/cart/:id', function(req, res){
    var productToRemoveFromCart = req.params.id;
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.user._id, { $pull: {'cart': productToRemoveFromCart} }, function(){
                req.session.cart = []
                res.end();
        })
    }
    else{
        req.session.cart.forEach(function(ele, idx){
            req.session.cart.splice(idx,1);
            res.end()
        })
    }
})

//from the signup page
router.post('/', function(req, res){
    User.create(req.body).then(function(){
        res.end()
    })
    .then(null);
});

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};
router.use('/',ensureAuthenticated)
//for showing all users who have accounts
router.get('/', function(req, res){
    User.find().exec()
        .then(function(users){
            res.json(users)
    })
})  

//for determing the state to go to upon login
router.post('/loggedInUser', function(req,res){
    User.findOne({email: req.body.email}).exec()
        .then(function(user){
            res.send(user)

        })
})
//for determing the state to go to upon login
// router.post('/loggedInUser', function(req,res,next){
//     User.findOne({email: req.body.email}).exec()
//         .then(function(user){
//             res.send(user)
//         })
// })



//////////////////////example to follow/////////////////////






