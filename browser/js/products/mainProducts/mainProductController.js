app.controller('mainProductCtrl', function($scope, $state, mainProductFactory){
	mainProductFactory.getAll()
	.then(function(data){
		$scope.products = data
	})

	$scope.getDetail = function(){
		$state.go('detailState');
	}
})