app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});


app.controller('homeCtrl', function($scope, sliderPics, $state){
	$scope.images = _.shuffle(sliderPics);
	$scope.goToProducts = function(){
		//console.log("im working")
		$state.go('mainProductState');
	}
})