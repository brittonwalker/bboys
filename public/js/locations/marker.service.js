"use strict";

(function() {
  angular
    .module("myApp")
    .service('MarkerService', ['$http', function($http) {
      this.getLocations = function() {
        return $http.get('http://localhost:3000/api/locations', location);
      };
    }]);
}());
