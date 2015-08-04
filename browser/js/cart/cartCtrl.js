app.controller("cartCtrl", function($scope, $http, AuthService, $state, cartFactory) {
    
    //to display the user's cart array items
    cartFactory.getProductsInCart().then(function(prods){
        $scope.cart = prods
    });
    //when the user clicks update qty button, persist change to item quantity in cart
    $scope.updateQty = cartFactory.updateQtyFactory;
    //when the user clicks remove button, persist change to cart
    $scope.removeProduct = function(product){
        cartFactory.removeFromCart(product)
        .then(function(){
            cartFactory.getProductsInCart().then(function(prods){
                $scope.cart = prods
            })
        })
    };
    //when user clicks checkout button, got to orderSuccess state and clear cart so
    //that they can not make a duplicate order
    $scope.purchase = function(cart){
        cartFactory.checkOutCart(cart)
            .then(function(order){
                $state.go('orderSuccess')
            })
    };

    //$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser); $rootScope inject
    //$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser); AUTH_EVENTS inject

})
app.controller('successCtrl', function($scope, $http, AuthService, $state, cartFactory){
    cartFactory.getLastOrder()
        .then(function(order){
            $scope.orderLast = order.products
        })
})