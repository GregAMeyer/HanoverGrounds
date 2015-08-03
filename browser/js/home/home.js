app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});


app.controller('homeCtrl', function($scope, sliderPics, $state, mainProductFactory){

	mainProductFactory.getAll().then(function(products){
		$scope.allProducts = products
	})

	$scope.getDetail = function(product) {
		$state.go('detailState', {
			id: product._id
		});
	};
})