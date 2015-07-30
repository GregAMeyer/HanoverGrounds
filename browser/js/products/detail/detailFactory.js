app.factory('detailFactory', function($http){
	return {
		submitReview: function(id, review){
			return $http.put('api/products/'+id+'/reviews', {review: review})
			.then(function(res){
				return res.data;
			})
		}
	}
})