'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart')
//for displaying the items in the user's cart
router.get('/cart', function(req, res){
    if(req.isAuthenticated()){
        User.findById(req.user._id).populate('cart.product').exec()
            .then(function(user) {
                res.json(user.cart)
            })
    }
    else{
        res.json(req.session.cart)
    }
})

router.post('/cart', function(req, res) {
    var cartIdx;
    var newCartQuantity;
    var productToAddToCart = req.body;
    if(req.isAuthenticated()){
        User.findById(req.user._id).exec()
            .then(function(user) {
                var itemArr = user.cart.filter(function(item, idx) {
                    if (item.product === productToAddToCart.product) {
                        cartIdx = idx
                    }
                    return item.product === productToAddToCart.product
                })

                if (!itemArr[0]) {
                    user.cart.push(productToAddToCart)
                } else {
                    user.cart.forEach(function(item) {
                        if (item.product === productToAddToCart.product) {
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
        //BUT FIRST MAKE EACH ITEM WITHING PRODUCT PROPERTY
        //CHECK IF ITEM IN CART ALREADY
        //IF IT IS UPDATE QUANTITY 
        //ELSE GIVE IT A QUANTITY PROPERTY VALUE 1
        console.log('NOT LOGGED IN REQ DOT BODY',req.body)
        var itemArr = req.session.cart.filter(function(item, idx){
                    // console.log('ITEM', item.product._id)
                    // console.log('PROD', productToAddToCart.product)
                    // console.log('TEST', item.product._id == productToAddToCart.product)
                    if(item.product._id == productToAddToCart.product){
                        cartIdx = idx
                    }
                    return item.product._id == productToAddToCart.product 
                })
                //if the filter returns an empty array because there were no exisiting same products in the cart
                if(!itemArr[0]){
                    Cart.create(req.body)
                        .then(function(cartItem){
                            Cart.findById(cartItem._id).populate('product').exec()
                            // cartItem.populate('product').exec()
                                .then(function(populatedCartItem){
                                    req.session.cart.push(populatedCartItem)
                                    res.json(req.session);
                                })
                            })
                } else{   
                    //THIS IS WHERE IT STOP WORKING FOR SURE?? MAYBE maybe....
                    //ITEM IS ALREADY IN CART
                    req.session.cart.forEach(function(item){
                        //THIS IS WHERE WE FIXED THE HELL OUT OF IT
                        if(item.product._id == productToAddToCart.product){
                            item.quantity++
                        }
                    })
                    res.json(req.session)
                }

    }
})

router.delete('/cart/:id', function(req, res) {
    var productToRemoveFromCart = req.params.id;
    if (req.isAuthenticated()) {
        User.findByIdAndUpdate(req.user._id, {
            $pull: {
                'cart': {
                    product: productToRemoveFromCart
                }
            }
        }, function() {
            req.session.cart = []
            res.end();
        })
    }
    else{
        req.session.cart.forEach(function(ele, idx){
            if(ele.product._id == req.params.id){
                req.session.cart.splice(idx,1);
                res.end()
            }
        })
    }
})

router.put('/cart/:id', function(req, res) {
    var cartIdx;
    var newCartQuantity;
    if (req.isAuthenticated()) {
        var productToUpdate = req.params.id;
        User.findById(req.user._id).exec()
            .then(function(user) {
                user.cart.forEach(function(item) {
                    if (item.product == productToUpdate) {
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
        // req.session.cart.push(req.body)
        // res.end();
        var productToUpdate = req.params.id;
        //console.log('REQ PARAMS UPDATE ID NOT LOGED IN', req.session.cart)
        Cart.find().exec()
            .then(function(items){
                console.log('Item array', items)
                req.session.cart.forEach(function(item){
                    console.log('UPDATE QUANT NOT LOGGED IN',item)
                    //console.log('NOT LOGGED IN REQ BODY', productToUpdate)
                    //THIS IS WHERE WE FIXED THE HELL OUT OF IT
                    console.log('ITEM', item.product._id)
                    console.log('PROD', productToUpdate)
                    console.log('TEST', item.product._id == productToUpdate)
                    if(item.product._id == productToUpdate){
                        item.quantity = req.body.quantity
                        console.log('AFTER IF QUANTITY OF ITEM', item)
                    }
                })
            res.json(req.session.cart)
        })
    }
})

router.post('/checkout', function(req, res) {
    Order.create({
        buyer: req.user._id
    }).then(function(order) {
        req.body.forEach(function(item) {
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
    })
    // .then(function(order){
    //     console.log('order save.then order: ', order)
    //     console.log('order save.then req.user.orderHistory: ', req.user.orderHistory)
    //     //res.json(order)
    // })
    .then(function(order){
        User.findById(req.user._id).exec().then(function(user){
            user.orderHistory.push(order)
            return user.save()
        })
        .then(function(user){
            // res.json(user.orderHistory[user.orderHistory.length-1])
            res.end()
        })
    })
})


router.get('/checkout', function(req, res){
    User.findById(req.user._id).exec()
        .then(function(user){
            user.cart = []
            return user.save()
        })
        .then(function(user) {
            return Order.findById(user.orderHistory[user.orderHistory.length - 1]).exec()
        })
        .then(function(order){
            res.json(order.toObject({virtuals:true}))
        })

})

router.get('/orderhistory', function(req,res){
    User.findById(req.user._id).populate('orderHistory').exec()
        .then(function(orderHistory){
            console.log(orderHistory)
            res.json(orderHistory)
        })
})


router.post('/', function(req, res) {
    User.create(req.body).then(function() {
        res.end()
    })
        .then(null);
});

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};
router.use('/', ensureAuthenticated)

router.get('/', function(req, res) {
    User.find().exec()
        .then(function(users) {
            res.json(users)
        })
})


router.post('/loggedInUser', function(req, res) {
    User.findOne({
        email: req.body.email
    }).exec()
        .then(function(user) {
            res.send(user)

        })
})
