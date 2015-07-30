app.controller('detailCtrl', function($scope, product, $state) {
	$scope.product = product;
	$scope.toProducts = function() {
		$state.go('mainProductState');
	};

});