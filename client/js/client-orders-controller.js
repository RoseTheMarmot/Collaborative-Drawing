(function(StoreApp){
	//client side controller for orders
  StoreApp.controller('OrdersController', function($scope, StoreFactory){
    
    $scope.orders = [];
    $scope.products = [];
    $scope.customers = [];
    
    $scope.addOrder = function(){
      StoreFactory.addOrder($scope.newOrder, function(data){
        $scope.orders = data;
        $scope.newOrder = {};
      });
    }

    StoreFactory.getOrders(function(data){
      $scope.orders = data;
    });
    StoreFactory.getProducts(function(data){
      $scope.products = data;
    });
    StoreFactory.getCustomers(function(data){
      $scope.customers = data;
    });

  });
})(StoreApp);