var myApp = angular.module('myApp', ['ui.router'])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider) {
    $stateProvider
      .state("locationsIndex", {
        url: "",
        templateUrl: "js/locations/index.html",
        controller: "LocationsIndexController",
        controllerAs: "LocationsIndexViewModel"
      })
      .state("locationsShow", {
        url: "/:id",
        templateUrl: "js/locations/show.html",
        controller: "LocationsShowController",
        controllerAs: "LocationsShowViewModel"
      })
    };
