var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Categories = Promise.promisifyAll(mongoose.model('Categories'));

var seedUsers = function() {
var users = [{
        password: "admin",
        email: 'admin@admin.admin',
        isSuperUser: true
    }, {
        password: 'sell',
        email: 'sell@sell.sell',
        isSeller: true
    }, {
        password: 'user',
        email: 'user@user.user'
    }]
    return User.createAsync(users);
}

var seedCategories = function() {
    var categories = [{
        itemCategory: 'Coffee Beans',
        roast: 'bold',
        region: 'Africa'
    }, 
    {
        itemCategory: 'Coffee Beans',
        roast: 'light',
        region: 'Central America'
    },
    {
        itemCategory: 'Coffee Beans',
        roast: 'medium',
        region: 'South America'
    },
    {
        itemCategory: 'Hardware',
        machine: "espresso"
    }]
    return Categories.createAsync(categories);
}

var seedProducts = function(users, categories) {

    var products = [{
        name: "Metropolis Coffee",
        seller: users[0]._id,
        description: "This unique cognac-like blend balances delicacy and elegance, with jasmine and orange notes giving way to buttery shortbread, and a mild caramel that ties it all together. A light and refreshing spring and summer brew with subtle yet astonishing nuances.",
        price: 15.30,
        photo: ["metropolis.jpg"],
        categories: categories[0]._id
        }, {
        name: "Perc Coffee",
        seller: users[1]._id,
        description: "Koke hails from Chyalalcktu village in the Kochere District of Southern Oromia. This coffee is special to us because it marks the first hybrid process Ethiopia we’ve ever offered. It’s the perfect blend of a washed and natural processed coffee. ",
        price: 14,
        photo: ["perc.jpeg"],
        categories: categories[1]._id
    }, {
        name: "San Jose OCAÑA",
        seller: users[2]._id,
        description: "This is not a loud coffee, a fruit bomb, it’s something more. Few farms in the world, let alone Guatemala are able to produce coffee of this quality this consistently. ",
        price: 13.95,
        photo: ["sanJoseOcana.jpeg"],
        categories: categories[2]._id
    }, {
        name: "Yum Coffee",
        seller: users[0]._id,
        description: "YUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ",
        price: 25,
        photo: ["sanJoseOcana.jpeg"],
        categories: categories[0]._id
    }, {
        name: "Coffee Me",
        seller: users[1]._id,
        description: "Great for kids!",
        price: 10,
        photo: ["sanJoseOcana.jpeg", "metropolis.jpg"],
        categories: categories[1]._id
    }];


    return Product.createAsync(products);

};


connectToDb.then(function() {
    User.findAsync({}).then(function(users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    })
        .then(function(users) {
            return Categories.findAsync({}).then(function(categories) {
                if (categories.length === 0) {
                   return seedCategories()
                   .then(function(categories){
                        return [users, categories]
                    });
                } else {
                    console.log(chalk.magenta('Seems to already be category data, exiting!'));
                    process.kill(0);
                }
            })
        })
        .then(function(array) {
            return Product.findAsync({}).then(function(products) {
                if (products.length === 0) {
                    return seedProducts(array[0], array[1]);
                } else {
                    console.log(chalk.magenta('Seems to already be product data, exiting!'));
                    process.kill(0);
                }
            })
                
        })
        .then(function() {
                    console.log(chalk.green('Seed successful!'));
                    process.kill(0);
                }).catch(function(err) {
                    console.error(err);
                    process.kill(1);
                });
})