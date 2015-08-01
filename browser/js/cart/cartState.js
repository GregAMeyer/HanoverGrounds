app.config(function($stateProvider) {
	$stateProvider
	.state("cart", {
			url: "/cart",
			templateUrl: "js/cart/cart.html",
			controller: "cartCtrl"
		})
});

app.factory('cartFactory', function($http){
	return{
		getProductsInCart: function(){
	    	return $http.get('api/members/cart')
	        	.then(function(products){
	            	return products.data
        		})
			},
		removeFromCart:	function(productToDelete){
    	//product will be an object, as declared in html
    	return $http.delete('/api/members/cart/'+productToDelete._id)
    	.then(function(remainingProducts){
    		return remainingProducts;
    	}, console.log)
    }
	}
})