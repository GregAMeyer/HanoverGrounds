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
//from the signup page
router.post('/', function(req, res, next){
    console.log("USER: ", User)
    console.log("PRODUCT: ", Product)
    console.log('body: ', req.body)
    User.create(req.body).then(function(createdUser){
        console.log("hitting users route: ", createdUser)
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
