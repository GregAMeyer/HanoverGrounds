app.controller('stripeCtrl', function($scope, priceFactory, $http) {
	$scope.card = {
		number: null,
		cvc: null,
		exp_month: null,
		exp_year: null
	}

	$scope.price = priceFactory.price;

	Stripe.setPublishableKey('pk_test_ASqYwepHO0lIY8UIiPR8J4et');
    $scope.checkoutStripe = function(card, price){
    	Stripe.card.createToken(card, function(status, response){
    		$http.post('/stripe/submit', {card: response, price: price})
    });
    }
})

