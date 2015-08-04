'use strict';
var router = require('express').Router();
module.exports = router;
//var _ = require('lodash');
//added for signing up line 20
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

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
        // req.session.cart must be made the second a visitor gets to the site
        req.session.cart.push(req.body)
        res.end();
    }
})
//for deleting an item in the user's cart
router.delete('/cart/:id', function(req, res){
    var productToRemoveFromCart = req.params.id;
    if(req.isAuthenticated()){
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



//CHECKING OUT CART

router.post('/checkout', function(req,res){
    Order.create({
        buyer: req.user._id
    }).then(function(order){
        req.body.forEach(function(item){
            order.products.push({
                checkoutItem: item.product._id,
                quantity: item.quantity,
                unitPrice: item.product.price,
                name: item.product.name,
                photo: item.product.photo,
                unitTotalPrice: (item.product.price * item.quantity)
            })
        })
        return order.save()
        //we need to put the order in the buyer's orderHistory
        //and in the sellers saleHistory
        // we need to email the order receipt or something
    })
    // .then(function(order){
    //     console.log('order save.then order: ', order)
    //     console.log('order save.then req.user.orderHistory: ', req.user.orderHistory)
    //     //res.json(order)
    // })
    .then(function(order){
        console.log('before user find by id update')
        User.findById(req.user._id).exec().then(function(user){
            console.log('do we have order?: ', order)
            user.orderHistory.push(order)
            return user.save()
        })
        .then(function(user){
            // res.json(user.orderHistory[user.orderHistory.length-1])
            res.end()
        })
        // User.findByIdAndUpdate(req.user._id, { $push: {'orderHistory': order }}, function(){
        //     //res.end();  
        //     console.log('insdide the find by id and update')  
        //     console.log('order save.then update req.user.orderHistory: ', req.user.orderHistory)
        // })
    })
})

router.get('/checkout', function(req, res){
    console.log('BEFORE ALL CHECKOUT')
    User.findById(req.user._id).exec()
        .then(function(user){
            console.log('USER BEFORE CART EMPY', user.cart)
            user.cart = []
            return user.save()
        })
        .then(function(user){
            return Order.findById(user.orderHistory[user.orderHistory.length-1]).exec()
        })
        .then(function(order){
            console.log('order from the get, called orderLast on scope', order)
            res.json(order)
        })
            // res.json(user)
            //res.json(user.orderHistory[user.orderHistory.length-1])


        //})
    // Order.find({buyer: req.user._id}).exec()
    //     .then(function(order){
    //         res.json(order)
    //     })

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




