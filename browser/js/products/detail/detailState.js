app.config(function ($stateProvider) {
    $stateProvider.state('detailState', {
        url: '/products/detail',
        templateUrl: 'js/products/detail/detail.html',
        controller: 'detailCtrl'
    });
});