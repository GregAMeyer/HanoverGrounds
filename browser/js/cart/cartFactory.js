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
					return order
				})
		},
		getLastOrder: function(){
			return $http.get('api/members/checkout')
						.then(function(order){
							return order.data
			})
		},
		getOrderHistory: function(){
			return $http.get('api/members/orderhistory')
				.then(function(pastOrders){
					console.log('your past orders', pastOrders)
					return pastOrders.data.cart
				})
		}
	}
})

app.factory('priceFactory', function(){
	return {
		price: 0
	}
})