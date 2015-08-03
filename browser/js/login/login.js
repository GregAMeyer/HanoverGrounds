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

app.controller('LoginCtrl', function ($scope, AuthService, $state,$http) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;
        //$http.post('/api/members/loggedInUser',loginInfo).then(function(user){
        // AuthService.getLoggedInUser().then(funciton(user){
        //     //do AuthService.login then use the getLoggedInUser and do the conditionals there
        // })
        //     if(user.data.isSeller){
        //         AuthService.login(loginInfo).then(function () {
        //             $state.go('dashboard.overview');  
        //         })
        //     }
        //     else if(user.data.isSuperUser){
        //         AuthService.login(loginInfo).then(function () {
        //             $state.go('superUser.overview');
        //         })  
        //     }
        //     else{
        //          AuthService.login(loginInfo).then(function () {
        //             $state.go('home');
        //         })
        //     }  
        AuthService.login(loginInfo).then(function(user){
            var user = AuthService.getLoggedInUser();
            if(user.isSeller){
                $state.go('dashboard.overview');
            }
            else if(user.isSuperUser){
                $state.go('superUser.overview');
            }
            else {
                $state.go('home');
            }   
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
        $http.post('/api/members', loginInfo).then(function(createdUser){
            AuthService.login(loginInfo).then(function () {
                $state.go('home');
            }).catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
        })
    };
    $scope.sendSignupSeller = function (loginInfo) {
        //make a new user
        var adminLoginInfo = loginInfo
        adminLoginInfo.isSeller = true;
        $http.post('/api/members', adminLoginInfo).then(function(createdUser){
            AuthService.login(adminLoginInfo).then(function () {
                $state.go('dashboard.overview');
            }).catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
        })        
    };
});