app.config(function($stateProvider) {
	$stateProvider.state('detailState', {
		url: '/products/:id',
		templateUrl: 'js/products/detail/detail.html',
		controller: 'detailCtrl',
		resolve: {
			product: function($stateParams, mainProductFactory) {
				console.log($stateParams)
				return mainProductFactory.getOne($stateParams.id)
			}
		}

	});
});