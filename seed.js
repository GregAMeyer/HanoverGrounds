var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));



var seedProducts = function() {

    var products = [{
        name: "Metropolis Coffee",
        company: "Hipster Coffee Comp",
        description: "This unique cognac-like blend balances delicacy and elegance, with jasmine and orange notes giving way to buttery shortbread, and a mild caramel that ties it all together. A light and refreshing spring and summer brew with subtle yet astonishing nuances.",
        price: 15.30,
        photo: ["metropolis.jpg"],
        rating: 3,
        category: "Coffee",
        roast: "Medium",
        region: "Africa"
    }, {
        name: "Perc Coffee",
        company: "Koke Cooperative Ethiopia",
        description: "Koke hails from Chyalalcktu village in the Kochere District of Southern Oromia. This coffee is special to us because it marks the first hybrid process Ethiopia we’ve ever offered. It’s the perfect blend of a washed and natural processed coffee. ",
        price: 14,
        photo: ["perc.jpeg"],
        rating: 3,
        category: "Coffee",
        roast: "Medium",
        region: "Africa"
    }, {
        name: "San Jose OCAÑA",
        company: "Cuvee Coffee",
        description: "This is not a loud coffee, a fruit bomb, it’s something more. Few farms in the world, let alone Guatemala are able to produce coffee of this quality this consistently. ",
        price: 13.95,
        photo: ["sanJoseOcana.jpeg"],
        rating: 3,
        category: "Coffee",
        roast: "Medium",
        region: "Central America"
    }, {
        name: "Yum Coffee",
        company: "Coughfay Companty",
        description: "YUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ",
        price: 25,
        photo: ["sanJoseOcana.jpeg"],
        rating: 3,
        category: "Coffee",
        roast: "Bold",
        region: "Mars"
    }, {
        name: "Coffee Me",
        company: "KAKAKACoffee",
        description: "Great for kids!",
        price: 10,
        photo: ["sanJoseOcana.jpeg", "metropolis.jpg"],
        rating: 3,
        category: "Coffee",
        roast: "Light",
        region: "Chucky Cheese"
    }];

    return Product.createAsync(products);

};



connectToDb.then(function() {
    Product.findAsync({}).then(function(products) {

        if (products.length === 0) {
            return seedProducts();
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
// .then(function () {
//     console.log(chalk.green('Seed successful!'));
//     process.kill(0);
// })
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