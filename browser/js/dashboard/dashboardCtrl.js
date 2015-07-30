app.controller("dashboardCtrl", function($scope, $http, AuthService, $state, dashboardFactory) {
    //included functionality via FSG
    $scope.logout = function () {
        AuthService.logout().then(function () {
           $state.go('home');
        });
    };
    //to display the user's productForSale array items
    dashboardFactory.getProductsForSale().then(function(prods){
        $scope.productsForSale = prods
    });

    $scope.addProduct = function(productToAdd){
    	//product will be an object, as declared in addAProduct.html
    	return $http.post('/api/products', productToAdd)
    	.then(function(){
            console.log('!!Product to Add',productToAdd)
    		$state.go('dashboard.overview')
    	}, console.log)
    };

    $scope.editProduct = function(productToEdit){
    	//product will be an object, as declared in editAProduct.html
    	return $http.put('/api/products/seller/'+productToEdit._id, productToEdit)
        //want to display an alert that the product was saved (prob a front end thing)
    };

    $scope.deleteProduct = function(productToDelete){
    	//product will be an object, as declared in html
    	return $http.delete('/api/products', productToDelete)
    	.then(function(){
    		$state.go('dashboard.overview')
    	}, console.log)
    };

    //$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser); $rootScope inject
    //$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser); AUTH_EVENTS inject

})

