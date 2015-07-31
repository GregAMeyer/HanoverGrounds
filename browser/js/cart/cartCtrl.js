app.controller("cartCtrl", function($scope, $http, AuthService, $state, cartFactory) {
    //included functionality via FSG
    $scope.logout = function () {
        AuthService.logout().then(function () {
           $state.go('home');
        });
    };
    //to display the user's productForSale array items
    cartFactory.getProductsInCart().then(function(prods){
        $scope.productsInCart = prods
    });

    $scope.removeProduct = function(productToDelete){
    	//product will be an object, as declared in html
    	return $http.delete('/api/members/cart', productToDelete)
    	.then(function(remainingProducts){
    		$scope.productsInCart = remainingProducts;
    	}, console.log)
    };

    // $scope.purchase = function(products){
    //     //make stripe work here
    // }

    //$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser); $rootScope inject
    //$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser); AUTH_EVENTS inject

})