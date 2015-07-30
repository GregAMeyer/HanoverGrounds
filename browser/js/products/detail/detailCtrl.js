
app.controller('detailCtrl', function($scope, product, $rootScope, detailFactory) {
	$scope.product = product;
	$scope.reviews = product.reviews;
	$scope.reviewData = "";
	$scope.resetReview = function(){
		$scope.reviewData = ""
	}
	$scope.storeData = function(){
		//other team: what is userID in this context?
		detailFactory.submitReview($scope.product._id, $scope.reviewData)
		.then(function(reviews){
			$scope.reviews = reviews;
			$scope.resetReview();
		})
	}	
	$scope.addProductToCart = detailFactory.addProductToCart;

})
