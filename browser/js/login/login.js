app.config(function($stateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'js/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('signupState', {
            url: '/signup',
            templateUrl: 'js/login/signup.html',
            controller: 'SignupCtrl'
        })

});

app.controller('LoginCtrl', function($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {
        $scope.error = null;

        AuthService.login(loginInfo).then(function(user) {
            var userLoggedIn = AuthService.getLoggedInUser()
            if (userLoggedIn.isSeller) {

                $state.go('dashboard.overview');
            } else if (userLoggedIn.isSuperUser) {
                $state.go('superUser.overview');
            } else {
                $state.go('home');
            }
        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });
    };
});

app.controller('SignupCtrl', function($scope, AuthService, $state, $http) {

    $scope.loginAdmin = {};
    $scope.login = {};
    $scope.error = null;

    $scope.sendSignup = function(loginInfo) {
        $http.post('/api/members', loginInfo).then(function() {
            AuthService.login(loginInfo).then(function() {
                $state.go('home');
            }).catch(function() {
                $scope.error = 'Invalid login credentials.';
            });
        })
    };
    $scope.sendSignupSeller = function(loginInfo) {
        var adminLoginInfo = loginInfo
        adminLoginInfo.isSeller = true;
        $http.post('/api/members', adminLoginInfo).then(function() {
            AuthService.login(adminLoginInfo).then(function() {
                $state.go('dashboard.overview');
            }).catch(function() {
                $scope.error = 'Invalid login credentials.';
            });
        })
    };
});