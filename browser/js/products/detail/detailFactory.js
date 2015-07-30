app.factory('detailFactory', function($http){
	return {
		submitReview: function(id, review){
			$http.put('api/products/'+id+'/reviews', {review: review})
			.then(function(res){
				return res.data;
			})
		}
	}
})