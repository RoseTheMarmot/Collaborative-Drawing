(function(StoreApp){
	//client site controller for customers
  StoreApp.controller('CustomersController', function($scope, StoreFactory){
    
    $scope.customers = [];

    $scope.addCustomer = function(){
      StoreFactory.addCustomer($scope.newCustomer, function(data){
        $scope.customers = data;
        $scope.newCustomer = {};
      });
    }

    StoreFactory.getCustomers(function(data){
      $scope.customers = data;
    });

  });
})(StoreApp);