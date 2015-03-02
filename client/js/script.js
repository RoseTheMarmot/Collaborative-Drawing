(function(){

  var StoreApp = angular.module('StoreApp', ['ngRoute']);

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

  //client side model
  StoreApp.factory('StoreFactory', function($http){
    var factory = {};

    var orders = [{customer:"Rose", product:"socks", quantity:3, date:"today"}];
    var customers = [];
    var products = [];

    factory.getOrders = function(callback){ 
      $http.get('/orders').success(function(output){
        orders = output;
        callback(orders);
      }); 
    }

    factory.getProducts = function(callback){
      $http.get('/products').success(function(output){
        products = output;
        callback(products);
      });  
    }

    factory.getCustomers = function(callback){
      $http.get('/customers').success(function(output){
        customers = output;
        callback(customers);
      });
    }

    factory.addOrder = function(data, callback){
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

    factory.addCustomer = function(data, callback){
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

})();





