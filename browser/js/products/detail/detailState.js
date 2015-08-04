app.config(function($stateProvider) {
	$stateProvider.state('detailState', {
		url: '/products/:id',
		templateUrl: 'js/products/detail/detail.html',
		controller: 'detailCtrl',
		resolve: {
			user: function(detailFactory) {
				return detailFactory.getUser();
			},
			product: function($stateParams, mainProductFactory) {
				return mainProductFactory.getOne($stateParams.id)
			}
		}

	});
});