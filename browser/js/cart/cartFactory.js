app.factory('cartFactory', function($http){
	return{
		getProductsInCart: function(){
	    	return $http.get('api/members/cart')
	        	.then(function(products){
	 				console.log('NOT LOGGED FACT PRODS', products)
	            	return products.data
        		})
			},
		getTotalForCart: function(cart){
			var total = 0;
			cart.forEach(function(item){
				total = total + (item.quantity * item.product.price)
			})
			return total
		},
		removeFromCart:	function(productToDelete){
	    	//product will be an object, as declared in html
	    	return $http.delete('/api/members/cart/'+productToDelete._id)
	    	.then(function(remainingProducts){
	    		return remainingProducts;
	    	}, console.log)
    	},
    	updateQtyFactory: function(prodToUpdate){
    		//product will be an object, as declared in html
	    	return $http.put('/api/members/cart/'+prodToUpdate.product._id, prodToUpdate)
	    	.then(function(remainingProducts){
	    		return remainingProducts;
	    	}, console.log)
		},
		checkOutCart: function(cart){
			return $http.post('/api/members/checkout', cart)
				.then(function(order){
					console.log('AFTER POST, creating order')
					return order
				})
		},
		getLastOrder: function(){
			return $http.get('api/members/checkout')
						.then(function(order){
							console.log('AFTER GET, res.json order.data.products', order.data.products)
							return order.data
			})
		}
	}
})