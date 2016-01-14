var myApp = angular.module('myApp', []);

myApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});

myApp.controller('MyController', function MyController($scope, $http) {

  $scope.product = {
  name: 'some name',
  description: 'some description',
  media: [{
    src: 'v5Asedlj2cw'
  }]
};

$scope.getIframeSrc = function(src) {
  return 'https://www.youtube.com/embed/' + src;
};

  $scope.method = "GET";
  $scope.url = 'http://localhost:3000/api/locations';

  var vm = this;
  vm.mydata = [];

  $http.get($scope.url)
      .then(function(result) {
        vm.mydata = result.data;
       });

});
