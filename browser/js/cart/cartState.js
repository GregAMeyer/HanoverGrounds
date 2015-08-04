app.config(function($stateProvider) {
	$stateProvider
	.state("cart", {
			url: "/cart",
			templateUrl: "js/cart/cart.html",
			controller: "cartCtrl"
		})
	//keeping this in here because you can only get to this state from the checkout state
	//they are inherently linked
	.state("orderSuccess", {
	url: "/checkout",
	templateUrl:"js/cart/checkout.html",
	controller: "successCtrl"
		})
});

