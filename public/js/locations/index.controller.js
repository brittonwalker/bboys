"use strict";

(function(){
  angular
  .module("myApp")
  .controller("LocationsIndexController", [
    '$scope',
    '$http',
    LocationsIndexControllerFunction
  ]);

  function LocationsIndexControllerFunction($scope, $http){
    $scope.method = "GET";
    $scope.url = 'http://localhost:3000/api/locations';

    var vm = this;
    vm.mydata = [];

    $http.get($scope.url)
        .then(function(result) {
          vm.mydata = result.data;
         });

  }
}());
