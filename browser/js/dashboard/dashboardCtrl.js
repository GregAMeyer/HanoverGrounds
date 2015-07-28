app.controller("dashboardCtrl", function ($scope, $http, AuthService, AUTH_EVENTS, $state, $rootScope) {

    $scope.logout = function () {
        AuthService.logout().then(function () {
           $state.go('home');
        });
    };

    $scope.addProduct = function(product){
    	//product will be an object, as declared in html
    	$http.post('/api/products', product)
    	.then(function(product){
    		$state.go('dashboard.overview')
    	}, console.log)
    };

    $scope.editProduct = function(product){
    	//product will be an object, as declared in html
    	$http.put('/api/products', product)
    	.then(function(product){
    		$state.go('dashboard.overview')
    	}, console.log)
    };

    $scope.deleteProduct = function(product){
    	//product will be an object, as declared in html
    	$http.delete('/api/products', product)
    	.then(function(product){
    		$state.go('dashboard.overview')
    	}, console.log)
    };


    $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

})