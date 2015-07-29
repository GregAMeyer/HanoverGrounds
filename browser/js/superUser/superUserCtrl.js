app.controller("superUserCtrl", function($scope, $http, AuthService, $state, superUserFactory) {
    //included functionality via FSG
    $scope.logout = function () {
        AuthService.logout().then(function () {
           $state.go('home');
        });
    };
    //to display all users
    superUserFactory.getAllUsers().then(function(users){
        $scope.users = users
    });

    $scope.editUser = function(userToEdit){
    	//user will be an object, as declared in editAUser.html
    	return $http.put('/api/admin/users/'+userToEdit._id, userToEdit)
        //want to display an alert that the product was saved (prob a front end thing)
    };

    $scope.deleteUser = function(userToDelete){
    	//product will be an object, as declared in html
    	return $http.delete('/api/admin/users/'+userToDelete._id, userToDelete)
    	//set $scope.users = new scope.users which will have one less user
        .then(function(){
            return superUserFactory.getAllUsers()
            //could do a filter instead of another ajax request here
    	})
        .then(function(users){
                $scope.users = users
            }, console.log)
    };

    //$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser); $rootScope inject
    //$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser); AUTH_EVENTS inject

})