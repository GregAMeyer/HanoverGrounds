
app.controller('detailCtrl', function($scope, product, detailFactory) {
	$scope.product = product;
	$scope.reviewData = "";
	$scope.storeData = function(){
		//other team: what is userID in this context?
		detailFactory.submitReview($scope.product._id, $scope.reviewData)
	}
})
