(function(StoreApp){
	//client side model
  StoreApp.factory('StoreFactory', function($http){
    var factory 	= 	{};

    var orders 		= 	[];
    var customers = 	[];
    var products 	= 	[];

    factory.getOrders 		= 	function(callback){ 
      $http.get('/orders').success(function(output){
        orders = output;
        callback(orders);
      }); 
    }
    factory.getProducts 	= 	function(callback){
      $http.get('/products').success(function(output){
        products = output;
        callback(products);
      });  
    }
    factory.getCustomers 	= 	function(callback){
      $http.get('/customers').success(function(output){
        customers = output;
        callback(customers);
      });
    }
    factory.addOrder 			= 	function(data, callback){
      $http({
        method: 'POST',
        url: '/orders',
        data: $.param(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      //set time on order (want to do this insead of doing another asc request to minimize requests)
      var date = new Date().getTime();
      var time = new Date(date);
      data.date = time.toString().substring(0,21);
      orders.push(data);
      callback(orders);
    }
    factory.addCustomer 	= 	function(data, callback){
      $http({
        method: 'POST',
        url: '/customers',
        data: $.param(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      customers.push(data);
      callback(customers);
    }

    return factory;
  });
})(StoreApp);