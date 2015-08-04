'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/cart', function(req, res) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id).populate('cart.product').exec()
            .then(function(user) {
                res.json(user.cart)
            })
    } else {
        Product.find({
            '_id': {
                $in: req.session.cart
            }
        }).exec()
            .then(function(productsInUsersCart) {
                res.send(productsInUsersCart)
            })
    }
})

router.post('/cart', function(req, res) {
    var cartIdx;
    var newCartQuantity;
    if (req.isAuthenticated()) {
        var productToAddToCart = req.body;
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
            .then(function(user) {
                res.json(user)
            })
    } else {
        req.session.cart.push(req.body)
        res.end();
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
    } else {
        req.session.cart.forEach(function(ele, idx) {
            if (ele._id === req.params.id) {
                req.session.cart.splice(idx, 1);
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
                    if (item.product === productToUpdate) {
                        item.quantity = req.body.quantity
                    }
                })
                return user.save()
            })
            .then(function(user) {
                res.json(user)
            })
    } else {
        req.session.cart.push(req.body)
        res.end();
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
        .then(function(order) {
            User.findById(req.user._id).exec().then(function(user) {
                user.orderHistory.push(order)
                return user.save()
            })
                .then(function(user) {
                    res.end()
                })
        })
})

router.get('/checkout', function(req, res) {
    User.findById(req.user._id).exec()
        .then(function(user) {
            user.cart = []
            return user.save()
        })
        .then(function(user) {
            return Order.findById(user.orderHistory[user.orderHistory.length - 1]).exec()
        })
        .then(function(order) {
            res.json(order)
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