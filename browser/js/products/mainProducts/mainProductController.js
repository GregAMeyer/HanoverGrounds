app.controller('mainProductCtrl', function($scope, mainProductFactory){
	mainProductFactory.getAll();
})