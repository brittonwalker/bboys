"use strict";

(function() {
    angular
      .module("myApp")
      .controller("LocationsIndexController", [
        '$scope',
        '$http',
        '$stateParams',
        LocationsIndexControllerFunction
      ]);

    function LocationsIndexControllerFunction($scope, $http, $stateParams) {
      $scope.method = "GET";
      $scope.url = 'http://localhost:3000/api/locations';

      var vm = this;
      vm.mydata = [];

      var getLocations = function() {
          $http.get($scope.url)
          .then(function(result) {
            vm.mydata = result.data;
          })};

      getLocations();

        $scope.deleteLocation = function(id) {
          $http.delete('http://localhost:3000/api/locations/' + id)
            .then(function(res) {
              console.log(res);
              getLocations();
            });
        }

      }
    }());
