app.factory('detailFactory', function($http){
	return {
		getReviews: function(id){
			return $http.get('api/products/reviews/'+ id)
				.then(function(res){
					return res.data;
				})
		},

		submitReview: function(id, review){
			return $http.post('api/products/reviews/'+id, {review: review})
			.then(function(res){
				return res.data;
			})
		},

		deleteReview: function(id){
			return $http.delete('api/products/reviews/'+id)
				.then(function(res){
					return 
				})
		}
	}
})