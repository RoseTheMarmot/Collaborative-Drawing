(function(StoreApp){
	 //Angular sudo-routes to show partial views
	  StoreApp.config(function ($routeProvider) {
	    $routeProvider
	      .when('/',{
	          templateUrl: 'partials/orders.html'
	      })
	      .when('/orders',{
	          templateUrl: 'partials/orders.html'
	      })
	      .when('/customers',{
	          templateUrl: 'partials/customers.html'
	      })
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
})(StoreApp);