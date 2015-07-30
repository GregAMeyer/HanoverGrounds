app.config(function($stateProvider) {
	$stateProvider
	.state("superUser", {
			url: "/admin",
			templateUrl: "js/superUser/superUser.html",
			contoller: "superUserCtrl"
		})
	.state("superUser.overview", {
			url: "/overview",
			templateUrl: "js/superUser/superUserOverview.html",
			controller: "superUserCtrl"
		})

	.state("superUser.editUser", {
			url: "/editUser",
			templateUrl: "js/superUser/editAUser.html",
			controller: "superUserCtrl"
		})
	.state("superUser.allProducts", {
			url: "/allProducts",
			templateUrl: "js/superUser/allProducts.html",
			controller: "superUserCtrl"
		})
});

app.factory('superUserFactory', function($http){
	return{
		getAllUsers: function(){
	    	return $http.get('/api/admin/users')
	        	.then(function(users){
	            	return users.data
        		})
			},
		getAllProducts: function(){
	    	return $http.get('/api/admin/products')
	        	.then(function(products){
	            	return products.data
        		})
			}
	}
})