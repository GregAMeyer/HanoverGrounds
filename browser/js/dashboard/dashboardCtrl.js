app.controller("dashboardCtrl", function($scope, $http, AuthService, $state) {

    console.log('hits the controller - dashboardCtrl line 3')

    $scope.logout = function () {
        AuthService.logout().then(function () {
           $state.go('home');
        });
    };

    $scope.addProduct = function(productToAdd){
    	//product will be an object, as declared in html, 
        //////    also need a user to add to his productsForSale array   ////////

    	return $http.post('/api/dashboard/products', productToAdd)
    	//.then(function(){
    		//$state.go('dashboard.overview')
    	//}, console.log)
    };

    $scope.editProduct = function(productToEdit){
    	//product will be an object, as declared in html
        //////    also need a user to add to his productsForSale array   ////////
    	return $http.put('/api/products'+productToEdit.id, productToEdit)
    	// .then(function(){
    	// 	$state.go('dashboard.overview')
    	// }, console.log)
    };

    $scope.deleteProduct = function(productToDelete){
    	//product will be an object, as declared in html
        //////    also need a user to add to his productsForSale array   ////////
    	return $http.delete('/api/products', productToDelete)
    	.then(function(){
    		$state.go('dashboard.overview')
    	}, console.log)
    };

    //$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser); $rootScope inject
    //$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser); AUTH_EVENTS inject

})

