app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'js/common/directives/navbar/navbar.html',

        link: function(scope) {

            scope.items = [{
                label: 'Home',
                state: 'home',
                auth: true
            }, {
                label: 'Products',
                state: 'mainProductState',
                auth: true
            }, {
                label: 'Seller Dashboard',
                state: 'dashboard.overview',
                needAuth: true,
                auth: false
            }, {
                label: 'Admin Dashboard',
                state: 'superUser.overview',
                type: 'admin',
                needAuth: true,
                auth: false
            }, {
                label: 'Cart',
                state: 'cart',
                auth: true
            }];

            function falsifyNeedAuth() {
                scope.items.forEach(function(ele) {
                    if (ele.needAuth) {
                        ele.auth = false
                    }
                })
            }
            function checkAuth() {
                scope.items.forEach(function(ele) {
                    if (ele.label == 'Seller Dashboard' && AuthService.isAuthenticatedSeller() ){
                        ele.auth = true
                    }
                    if (ele.label == 'Admin Dashboard' && AuthService.isAuthenticatedSuperUser() ){
                        ele.auth = true
                    }
                })
            }

            $rootScope.$on(AUTH_EVENTS.logoutSuccess, falsifyNeedAuth);

            $rootScope.$on(AUTH_EVENTS.loginSuccess, checkAuth);

            scope.isShowable = function(item) {
                if (item.auth === 'seller') {
                    return AuthService.isAuthenticatedSeller()
                }
            }
            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
                scope.isSeller = false;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        },
        controller: function($scope) {
            $scope.scroll = 0;
        }

    };

});