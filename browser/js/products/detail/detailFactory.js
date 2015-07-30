app.factory('detailFactory', function($http, $state){
	return {
		submitReview: function(id, review){
			return $http.put('api/products/'+id+'/reviews', {review: review})
			.then(function(res){
				return res.data;
			})
		},
		addProductToCart: function(productId){
			console.log(productId)
			return $http.post('/api/members/cart', {_id: productId})
			.then(function(product){
				$state.go('cart')
				return product.data;
			})
		}
	}
})