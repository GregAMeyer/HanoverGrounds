app.controller('mainProductCtrl', function($scope, $state, mainProductFactory) {
	mainProductFactory.getAll()
		.then(function(products) {
			$scope.products = products
			return products
		})
		.then(function(products){
			products.forEach(function(product){
				mainProductFactory.getCategories(product._id)
					.then(function(categories){
					$scope.categories = categories			
			})
		})
	})
	


	$scope.getDetail = function(product) {
		$state.go('detailState', {
			id: product._id
		});
	};



});