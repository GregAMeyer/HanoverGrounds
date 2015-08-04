app.controller('mainProductCtrl', function($scope, $state, products, mainProductFactory) {
    $scope.categories = [];
    $scope.products = products;

    (function(prods) {
        $scope.productList = [];
        prods.forEach(function(product) {
            mainProductFactory.getCategories(product._id)
                .then(function(categories) {
                    var cats = {};
                    for (var key in categories) {
                        if (key !== "_id" && key !== "__v") {
                            cats[key] = categories[key];
                        }
                    }
                    product.categories = cats;
                    $scope.productList.push(product);
                    Object.keys(product.categories).forEach(function(category) {
                        if (!$scope.categories.indexOf(category)) {
                            $scope.categories.push(category);
                        }
                    });
                });
        });
    })($scope.products);

    $scope.showCategories = function(product) {
        if (product.categories.itemCategory === 'Coffee') return product.categories.itemCategory + '/' + product.categories.roast + '/' + product.categories.region;
        else if (product.categories.itemCategory === 'Hardware') return product.categories.itemCategory + '/' + product.categories.machine;
    }

});