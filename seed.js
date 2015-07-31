var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Categories = Promise.promisifyAll(mongoose.model('Categories'));




var seedProducts = function() {

    var products = [{
        name: "Metropolis Coffee",
        seller: "Hipster Coffee Comp",
        description: "This unique cognac-like blend balances delicacy and elegance, with jasmine and orange notes giving way to buttery shortbread, and a mild caramel that ties it all together. A light and refreshing spring and summer brew with subtle yet astonishing nuances.",
        price: 15.30,
        quantity: 3,
        photo: ["metropolis.jpg"]
    }, {
        name: "Perc Coffee",
        seller: "Koke Cooperative Ethiopia",
        description: "Koke hails from Chyalalcktu village in the Kochere District of Southern Oromia. This coffee is special to us because it marks the first hybrid process Ethiopia we’ve ever offered. It’s the perfect blend of a washed and natural processed coffee. ",
        price: 14,
        quantity: 3,
        photo: ["perc.jpeg"]
    }, {
        name: "San Jose OCAÑA",
        seller: "Cuvee Coffee",
        description: "This is not a loud coffee, a fruit bomb, it’s something more. Few farms in the world, let alone Guatemala are able to produce coffee of this quality this consistently. ",
        price: 13.95,
        quantity: 3,
        photo: ["sanJoseOcana.jpeg"]
    }, {
        name: "Yum Coffee",
        seller: "Coughfay Companty",
        description: "YUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ",
        price: 25,
        quantity: 3,
        photo: ["sanJoseOcana.jpeg"]
      
    }, {
        name: "Coffee Me",
        seller: "KAKAKACoffee",
        description: "Great for kids!",
        price: 10,
        quantity: 3,
        photo: ["sanJoseOcana.jpeg", "metropolis.jpg"]
    }];

    return Product.createAsync(products);

};

var seedUsers = function(){
    var users = [
        {password: "admin", email: 'admin@admin.admin', isSuperUser: true},
        {password: 'sell', email: 'sell@sell.sell', isSeller: true},
        {password: 'user', email: 'user@user.user'}
    ]
     return User.createAsync(users);
}



connectToDb.then(function() {
    Product.findAsync({}).then(function(products) {

        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be product data, exiting!'));
            process.kill(0);
        }
    })
    .then(function() {
        User.findAsync({}).then(function(users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be product data, exiting!'));
                process.kill(0);
            }
        }).then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
    })
})