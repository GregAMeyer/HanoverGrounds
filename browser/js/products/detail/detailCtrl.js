app.controller('detailCtrl', function($scope, product, $rootScope, detailFactory, mainProductFactory) {
	$scope.product = product;
	$scope.reviewData = "";

	mainProductFactory.getCategories($scope.product._id)
		.then(function(categories) {
			$scope.categories = categories;
		})

	$scope.getCurrentReviews = function() {
		detailFactory.getReviews($scope.product._id)
			.then(function(reviews) {
				$scope.reviews = reviews;
			});
	};

	$scope.getCurrentReviews();
	$scope.rating;

	$scope.resetReview = function() {
		$scope.reviewData = ""
	}
	$scope.storeData = function() {
		detailFactory.submitReview($scope.product._id, $scope.reviewData, $scope.rating)
			.then(function() {
				$scope.reviews = $scope.getCurrentReviews()
				$scope.resetReview();
				
			})
	}
	$scope.addProductToCart = detailFactory.addProductToCart;

	$scope.deleteData = function(id) {
		console.log('THE ID DELETE', id)
		detailFactory.deleteReview(id)
			.then(function() {
				$scope.reviews = $scope.getCurrentReviews();
			})
	}


})
// $scope.editData = function(id){
// 	detailFactory.editReview(id)
// }