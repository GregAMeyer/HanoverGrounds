app.directive('dashboard', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        // link: function ($scope) {

            // $scope.logout = function () {
            //     AuthService.logout().then(function () {
            //        $state.go('home');
            //     });
            // };

            // $scope.addProduct = function(){};

            // $scope.deleteProduct = function(){};

            // $scope.editProduct = function(){};

            // $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            // $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        //}

    };

});