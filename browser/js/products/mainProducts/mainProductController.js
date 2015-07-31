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
						//this isn't going to work. is getting the cats for one product and applying to all
						// var cats = {};
						// for (var key in categories){
						// 	if (key !== "_id" && key !== "__v"){
						// 		cats[key] = categories[key];
						// 	}
						// }
						// $scope.categories = cats;
						$scope.categories = categories;
						console.log($scope.categories)
			})
		})
	})
	


	$scope.getDetail = function(product) {
		$state.go('detailState', {
			id: product._id
		});
	};



});