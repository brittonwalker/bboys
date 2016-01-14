"use strict";

(function(){
  angular
  .module("myApp")
  .controller("LocationsShowController", [
    '$scope',
    '$http',
    '$stateParams',
    LocationsShowControllerFunction
  ]);

  function LocationsShowControllerFunction($scope, $http, $stateParams){
    $scope.method = "GET";
    var id = $stateParams.id;
    $scope.url = 'http://localhost:3000/api/locations/' + id;

    var vm = this;
    vm.myData = {};

    $http.get($scope.url)
        .then(function(result) {
          vm.myData = result.data;
         });
         
  }
}());
