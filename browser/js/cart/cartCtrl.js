app.controller("cartCtrl", function($scope, $http, AuthService, $state, cartFactory) {

    cartFactory.getProductsInCart().then(function(prods) {
        $scope.cart = prods
    });

    $scope.updateQty = cartFactory.updateQtyFactory;

    $scope.removeProduct = function(product) {
        cartFactory.removeFromCart(product)
            .then(function() {
                cartFactory.getProductsInCart().then(function(prods) {
                    $scope.cart = prods
                })
            })
    };

    $scope.purchase = function(cart) {
        cartFactory.checkOutCart(cart)
            .then(function() {
                $state.go('orderSuccess')
            })
    };


    $scope.getTotal = cartFactory.getTotalForCart;
    //$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser); $rootScope inject
    //$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser); AUTH_EVENTS inject

})
app.controller('successCtrl', function($scope, $http, AuthService, $state, cartFactory) {
    cartFactory.getLastOrder()
        .then(function(order){
            $scope.orderLast = order
        })
})