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
        User.findById(req.user._id).populate('cart.product').exec()
            .then(function(user){
                res.json(user.cart)
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
//for adding items to cart, checking if already in cart also
router.post('/cart', function(req, res){
    var cartIdx;
    var newCartQuantity;
    if(req.isAuthenticated()){
        var productToAddToCart = req.body;
        console.log('CHECKING CART',productToAddToCart)
        User.findById(req.user._id).exec()
            .then(function(user){
                var itemArr = user.cart.filter(function(item, idx){
                    if(item.product == productToAddToCart.product){
                        cartIdx = idx
                    }
                    return item.product == productToAddToCart.product 
                })
                //if the filter returns an empty array because there were no exisiting same products in the cart
                if(!itemArr[0]){
                    user.cart.push(productToAddToCart)
                } else{   
                    //THIS IS WHERE IT STOP WORKING FOR SURE?? MAYBE maybe....
                    //ITEM IS ALREADY IN CART
                    user.cart.forEach(function(item){
                        //THIS IS WHERE WE FIXED THE HELL OUT OF IT
                        if(item.product == productToAddToCart.product){
                            item.quantity++
                        }
                    })
                }

            return user.save()
            
        })
        .then(function(user){
            res.json(user)
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
        console.log('CART REMOVE ITEM',productToRemoveFromCart)
        User.findByIdAndUpdate(req.user._id, { $pull: {'cart': {product: productToRemoveFromCart}} }, function(){
                req.session.cart = []
                res.end();
        })
    }
    else{
        req.session.cart.forEach(function(ele, idx){
            if(ele._id === req.params.id){
                req.session.cart.splice(idx,1);
                res.end()
            }
        })
    }
})
//for updating product in carts quantity
router.put('/cart/:id', function(req, res){
    var cartIdx;
    var newCartQuantity;
    if(req.isAuthenticated()){
        var productToUpdate = req.params.id;
        User.findById(req.user._id).exec()
            .then(function(user){
                user.cart.forEach(function(item){
                    //THIS IS WHERE WE FIXED THE HELL OUT OF IT
                    if(item.product == productToUpdate){
                        item.quantity = req.body.quantity
                    }
                })
            return user.save()
        })
        .then(function(user){
            res.json(user)
        })
    }
    else{
        //for NOT logged in users
        // req.session.cart mut be made the second a visitor gets to the site
        req.session.cart.push(req.body)
        res.end();
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



//////////////////////MAYBE USEFUL CART FUNCTIONS/////////////////////

        // User.findById(req.user._id).exec()
        //     .then(function(user){
        //         //user.cart is an array of ids
        //         //Product.find each id
        //         return Product.find({
        //             '_id': {
        //                 $in: user.cart
        //             }
        //         }).exec()
        //             .then(function(productsInUsersCart){
                        
        //                 if a product in productsInUsersCart has an id that matches an 
        //                 id of an item in user.cart then make product.quantity equal
        //                 to the item.quantit
                        
        //                 productsInUsersCart.forEach(function(product){
        //                     user.cart.forEach(function(item){
        //                         if(item.id === product.id){
        //                             product.quantity = 99
        //                         }
        //                     })
        //                 })
        //                 res.send(productsInUsersCart)     
        //             })
        // })




