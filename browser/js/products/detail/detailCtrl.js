app.controller('detailCtrl', function($scope, product, $rootScope, detailFactory, mainProductFactory) {
	$scope.product = product;
	$scope.reviewData = "";
	$scope.showReviewBox = true;
	$scope.aggArr = [];
	var showCups = false;
	$scope.getCurrentUser = function() {
		detailFactory.getUser()
			.then(function(user) {
				$scope.currentUser = user.data.user;
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
				var totalRating = 0;
				var count = 0;
				$scope.reviews.forEach(function(review) {
					console.log(review.rating)
					if (review.rating) {
						count++;
						totalRating += review.rating;
					}
				})
				$scope.aggRating = Math.floor(totalRating / count);
				console.log("RATING", $scope.aggRating);
				for (var i = 0; i < $scope.aggRating; i++) {
					$scope.aggArr.push(i);
					// $scope.aggArr.push('HELLO');
				}


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