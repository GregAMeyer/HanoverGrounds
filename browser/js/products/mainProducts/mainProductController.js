app.controller('mainProductCtrl', function($scope, $state, mainProductFactory) {
    $scope.categories = [];
    mainProductFactory.getAll()
        .then(function(products) {

            $scope.products = products;
            return products;

        })
        .then(function(products) {
            $scope.productList = [];
            products.forEach(function(product) {
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
                    })
            });
        });

    $scope.getDetail = function(product) {
        $state.go('detailState', {
            id: product._id
        });
    };

    $scope.showCategories = function(product) {
        if (product.categories.itemCategory === 'Coffee') return product.categories.itemCategory + '/' + product.categories.roast + '/' + product.categories.region;
        else if (product.categories.itemCategory === 'Hardware') return product.categories.itemCategory + '/' + product.categories.machine;
    }


});
''