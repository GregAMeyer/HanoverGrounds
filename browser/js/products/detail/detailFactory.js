app.factory('detailFactory', function($http, $state){
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
		addProductToCart: function(productId){
			console.log('req.session from add to cart: ')
			return $http.post('/api/members/cart', {_id: productId})
			.then(function(product){
				$state.go('cart')
				return product.data;
			})
		},
		deleteReview: function(id){
			return $http.delete('api/products/reviews/'+id)
				.then(function(){
					return 
				})
		}
	}
})