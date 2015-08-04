app.config(function($stateProvider) {
	$stateProvider.state('mainProductState', {
		url: '/products',
		templateUrl: 'js/products/mainProducts/mainProduct.html',
		controller: 'mainProductCtrl',
		resolve: {
			products: function(mainProductFactory) {
				return mainProductFactory.getAll();
			}
		}
	});
});