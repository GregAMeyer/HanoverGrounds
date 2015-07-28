app.config(function ($stateProvider) {

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

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, $http) {

    $scope.loginAdmin = {};
    $scope.login = {};
    $scope.error = null;
    $scope.sendSignup = function (loginInfo) {
        //make a new user
        console.log("SEND SIGNUP LOGIN.JS LINE 43")
        $http.post('/members', loginInfo)

        // $scope.error = null;

        // AuthService.login(loginInfo).then(function () {
        //     $state.go('home');
        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });
    };
    $scope.sendSignupSeller = function (loginInfo) {
        //make a new user
        var adminLoginInfo = loginInfo
        adminLoginInfo.isAdmin = true;

        $http.post('/api/members', adminLoginInfo).then(function(createdUser){
            $scope.error = null;
            $state.go('dashboard.overview');
            // AuthService.login(adminLoginInfo).then(function () {
            //     $state.go('dashboard.overview');
            // }).catch(function () {
            //     $scope.error = 'Invalid login credentials.';
            // });
        })

        
    };

});