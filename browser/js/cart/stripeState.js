app.config(function($stateProvider) {
	$stateProvider
	.state("stripe", {
			url: "/stripe",
			templateUrl: "js/cart/stripe.html",
			controller: 'stripeCtrl'
		})
});