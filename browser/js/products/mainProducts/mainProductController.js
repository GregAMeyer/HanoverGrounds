app.controller('mainProductCtrl', function($scope, mainProductFactory){
	mainProductFactory.getAll()
	.then(function(data){
		$scope.products = data
	})
})