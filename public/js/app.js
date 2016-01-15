var myApp = angular.module('myApp', ['ui.router'])
  .config([
    "$stateProvider",
    "$sceDelegateProvider",
    RouterFunction
  ]);

function RouterFunction($stateProvider, $sceDelegateProvider) {
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
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
  ]);
};
