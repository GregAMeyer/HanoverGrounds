app.controller('detailCtrl', function($scope, product, $rootScope, detailFactory, mainProductFactory) {
	$scope.product = product;
	$scope.reviewData = "";
	$scope.showReviewBox = true;
	$scope.getCurrentUser = function() {
		detailFactory.getUser()
			.then(function(user) {
				$scope.currentUser = user.data.user;
				console.log("USERRRR", $scope.currentUser);
			})
	};
	$scope.getCurrentUser();

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
		$scope.hideDelButton = false;
		$scope.showReviewBox = false;
		detailFactory.submitReview($scope.product._id, $scope.reviewData, $scope.rating)
			.then(function() {
				$scope.reviews = $scope.getCurrentReviews()
				$scope.resetReview();

			})
	}
	$scope.addProductToCart = detailFactory.addProductToCart;

	$scope.deleteData = function(id) {
		$scope.showReviewBox = true;
		detailFactory.deleteReview(id)
			.then(function() {
				$scope.reviews = $scope.getCurrentReviews();
			})
	}



})
// $scope.editData = function(id){
// 	detailFactory.editReview(id)
// }