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
        $http.post('/api/members/loggedInUser',loginInfo).then(function(user){
            console.log('FURST: ',user)
            if(user.data.isSeller){
                console.log('@#@#loginInfo@#@#: ',loginInfo)
                AuthService.login(loginInfo).then(function () {
                    $state.go('dashboard.overview');  
                })
            }
            else if(user.data.isSuperUser){
                console.log('ELIF ELIF ELIFloginInfo@#@#: ',loginInfo)
                AuthService.login(loginInfo).then(function () {
                    $state.go('superUser.overview');
                })  
            }
            else{
                console.log('ELSEELSEELSEloginInfo@#@#: ',loginInfo)
                 AuthService.login(loginInfo).then(function () {
                    $state.go('home');
                })
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
            //$state.go('home');

            AuthService.login(adminLoginInfo).then(function () {
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
            //$state.go('dashboard.overview');
            AuthService.login(adminLoginInfo).then(function () {
                $state.go('dashboard.overview');
            }).catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
        })

        
    };

});