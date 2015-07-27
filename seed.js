var async = require('async'),
    mongoose = require('mongoose');

var models = require('/server/db/models');
var Product = models.Product;

var data = {
    Product: [
        {name: "Metropolis Coffee", company: "Hipster Coffee Comp", description: "This unique cognac-like blend balances delicacy and elegance, with jasmine and orange notes giving way to buttery shortbread, and a mild caramel that ties it all together. A light and refreshing spring and summer brew with subtle yet astonishing nuances.", price: 15.30, photo: "/metropolis.jpg", rating: 3, category: "Coffee", roast: "Medium", region: "Africa"},
        {name: "Perc Coffee", company: "Koke Cooperative Ethiopia", description: "Koke hails from Chyalalcktu village in the Kochere District of Southern Oromia. This coffee is special to us because it marks the first hybrid process Ethiopia we’ve ever offered. It’s the perfect blend of a washed and natural processed coffee. ", price: 14, photo: "/perc.jpeg", rating: 3, category: "Coffee", roast: "Medium", region: "Africa"},
        {name: "San Jose OCAÑA", company: "Cuvee Coffee", description: "This is not a loud coffee, a fruit bomb, it’s something more. Few farms in the world, let alone Guatemala are able to produce coffee of this quality this consistently. ", price: 13.95, photo: "/sanJoseOcana.jpeg", rating: 3, category: "Coffee", roast: "Medium", region: "Central America"},
        {name: "Yum Coffee", company: "Coughfay Companty", description: "YUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ", price: 25, photo: "/sanJoseOcana.jpeg", rating: 3, category: "Coffee", roast: "Bold", region: "Mars"},
        {name: "Coffee Me", company: "KAKAKACoffee", description: "Great for kids!", price: 10, photo: "/sanJoseOcana.jpeg", rating: 3, category: "Coffee", roast: "Light", region: "Chucky Cheese"}
    ]}



mongoose.connection.on('open', function() {
mongoose.connection.db.dropDatabase(function() {
    
    console.log("Dropped old data, now inserting data");
    async.each(Object.keys(data),
        function(modelName, outerDone) {
            async.each(data[modelName],
                function(d, innerDone) {
                    models[modelName].create(d, innerDone);
                },
                outerDone
            );
        },
        function(err) {
            console.log("Finished inserting data");
            console.log("Control-C to quit");
        }
    );
});
});