app.factory('detailFactory', function($http){
	return {
		submitReview: function(id, review, user){
			$http.put('api/products/'+id+'/reviews', {user: user, review: review})
			.then(function(res){
				return res.data;
			})
		}
	}
})