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
        itemCategory: 'Coffee',
        roast: 'bold',
        region: 'Africa'
    }, {
        itemCategory: 'Coffee',
        roast: 'light',
        region: 'Central America'
    }, {
        itemCategory: 'Coffee',
        roast: 'medium',
        region: 'South America'
    }, {
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
        photo: ["./images/coffeeFlipLeft.png"],
        categories: categories[0]._id
    }, {
        name: "Perc Coffee",
        seller: users[1]._id,
        description: "Koke hails from Chyalalcktu village in the Kochere District of Southern Oromia. This coffee is special to us because it marks the first hybrid process Ethiopia we’ve ever offered. It’s the perfect blend of a washed and natural processed coffee. ",
        price: 14,
        photo: ["./images/coffeeRightNoBG.png"],
        categories: categories[1]._id
    }, {
        name: "San Jose OCAÑA",
        seller: users[2]._id,
        description: "This is not a loud coffee, a fruit bomb, it’s something more. Few farms in the world, let alone Guatemala are able to produce coffee of this quality this consistently. ",
        price: 13.95,
        photo: ["./images/coffeeFlipRight.png"],
        categories: categories[2]._id
    }, {
        name: "The Intelligentsia",
        seller: users[0]._id,
        description: "Helvetica swag Odd Future mixtape Williamsburg. Carles paleo Intelligentsia, pug polaroid Tumblr mixtape master cleanse. Cliche leggings art party stumptown viral mlkshk, Godard chambray lo-fi vegan messenger bag Odd Future Helvetica flannel. ",
        price: 2995,
        photo: ["./images/luccaNoBG1.png"],
        categories: categories[3]._id
    }, {
        name: "The Marzocco",
        seller: users[0]._id,
        description: "Master cleanse mixtape viral typewriter. Neutra heirloom whatever mumblecore, mixtape roof party vegan Wes Anderson hoodie. Schlitz pickled street art, drinking vinegar tousled paleo salvia Echo Park mlkshk freegan 3 wolf moon hashtag art party craft beer taxidermy.",
        price: 25,
        photo: ["./images/luccaNoBG3.png"],
        categories: categories[3]._id
    }, {
        name: "The Vesuvius",
        seller: users[0]._id,
        description: "Flexitarian drinking vinegar Etsy pork belly pug. Bitters vegan chia, fingerstache fap jean shorts narwhal irony occupy aesthetic. Pug narwhal banjo, kitsch heirloom Vice cred sriracha gentrify drinking vinegar skateboard cold-pressed selvage High Life Echo Park.",
        price: 25,
        photo: ["./images/luccaNoBG5.png"],
        categories: categories[3]._id
    }];


    return Product.createAsync(products);

};



connectToDb.then(function() {

    mongoose.connection.db.dropDatabase(function() {

        console.log("Dropped old data, now inserting data");

        console.log('1')

        User.findAsync({}).then(function(users) {

            console.log('2')

            if (users.length === 0) {
                console.log('3')
                return seedUsers();
            } else {
                console.log('4')
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                console.log('5')
                //users.remove({})
                console.log('6')
                console.log('dropped data', users)
                return seedUsers();
                //process.kill(0);
            }
        })
            .then(function(users) {
                return Categories.findAsync({}).then(function(categories) {
                    if (categories.length === 0) {
                        return seedCategories()
                            .then(function(categories) {
                                return [users, categories]
                            });
                    } else {
                        console.log(chalk.magenta('Seems to already be category data, exiting!'));
                        //categories.remove()
                        console.log('dropped data', categories)
                        return seedCategories()
                            .then(function(categories) {
                                return [users, categories]
                            });
                        //process.kill(0);
                    }
                })
            })
            .then(function(array) {
                return Product.findAsync({}).then(function(products) {
                    if (products.length === 0) {
                        return seedProducts(array[0], array[1]);
                    } else {
                        console.log(chalk.magenta('Seems to already be product data, exiting!'));
                        //products.remove()
                        console.log('dropped data', products)
                        return seedProducts(array[0], array[1]);
                        //process.kill(0);
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
})