app.controller('mainProductCtrl', function($scope, $state, mainProductFactory) {
	mainProductFactory.getAll()
		.then(function(data) {
			$scope.products = data
		})

	$scope.getDetail = function(product) {
		$state.go('detailState', {
			id: product._id
		});
	};
});