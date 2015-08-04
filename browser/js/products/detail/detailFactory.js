app.factory('detailFactory', function($http, $state) {
	return {
		getReviews: function(id) {
			return $http.get('api/products/reviews/' + id)
				.then(function(res) {
					console.log('RES', res.data);
					return res.data;
				});
		},

		submitReview: function(id, review, rating) {
			return $http.post('api/products/reviews/' + id, {
					review: review,
					rating: rating
				})
				.then(function(res) {
					return res.data;
				});
		},

		addProductToCart: function(productId) {
			console.log('req.session from add to cart: ')
			return $http.post('/api/members/cart', {product: productId})
			.then(function(product){
				$state.go('cart')
				console.log('NOT LOGGED USER CART FRONT END',product.data)
				return product.data;
			})

		},
		deleteReview: function(id) {
			return $http.delete('api/products/reviews/' + id)
				.then(function() {
					return;
				})
		},

		getUser: function() {
			return $http.get('/session')
				.then(function(user) {
					return user;
				})
		}
	}

})