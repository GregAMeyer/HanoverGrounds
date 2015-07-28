app.config(function($stateProvider) {
	$stateProvider
	.state("dashboard", {
			url: "/dashboard",
			templateUrl: "js/dashboard/dashboard.html",
			//contoller: "/dashboardController.js"
		})
	.state("dashboard.overview", {
			url: "/overview",
			templateUrl: "js/dashboard/dashboardOverview.html",
			//controller: "/dashboardController.js"
		})
	.state("dashboard.addProduct", {
			url: "/addProduct",
			templateUrl: "js/dashboard/addAProduct.html",
			controller: "dashboardCtrl"
		})
	.state("dashboard.editProduct", {
			url: "/editProduct",
			templateUrl: "js/dashboard/editAProduct.html",
			//controller: "/dashboardController.js"
		})
});