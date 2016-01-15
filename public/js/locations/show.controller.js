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
          for(var i = 0; i < result.data.posts.length; i++){
            var post = vm.myData.posts[i]
            var videoUrl = post.video_url
            var videoId = videoUrl.split("?v=")[1]
            var embedUrl = "https://www.youtube.com/embed/" + videoId
            vm.myData.posts[i].embeded_url = embedUrl
            // some logic to add another property to video url
          }
         });

    $scope.formData = {};

    $scope.processForm = function() {
      $scope.url2 = 'http://localhost:3000/api/locations/' + id + '/posts';

      $http({
      method    : 'POST',
      url       : $scope.url2,
      data      : $.param($scope.formData),
      headers   : { 'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .success(function(data) {
          console.log(data);
          // if (!data.success) {
          //   $scope.errorName = data.errors.name
          // } else {
          //   $scope.message = data.message;
          // }
          $state.go("locationsShow")
        })
    };

  }
}());
