app.controller('mainProductCtrl', function($scope, $state, mainProductFactory) {
    $scope.categories=[];
    mainProductFactory.getAll()
        .then(function(products) {
            $scope.products = products
            return products
        })


    .then(function(products) {
        $scope.productList = [];
        products.forEach(function(product) {
            mainProductFactory.getCategories(product._id)
                .then(function(categories) {
                    var cats = {};
                    for (var key in categories){
                    	if (key !== "_id" && key !== "__v"){
                    		cats[key] = categories[key];
                    	}
                    }
                    product.categories = cats;
                    $scope.productList.push(product);
                })
        })

    })

    $scope.getDetail = function(product) {
        $state.go('detailState', {
            id: product._id
        });
    };

});




/*


get all products - forEach over all the products to get respective categories

attach correct product to correct category

render

*/