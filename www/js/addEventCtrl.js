angular.module('jauntly.addEventCtrl', [])

.controller('addEventCtrl', function ($scope, $state, ExpediaInfo, GoogleGeocodeInfo, Auth, Event, NgMap) {

  $scope.results = {};
  $scope.address;
  $scope.email = Auth.authData.facebook.email;
  $scope.latLng;
  $scope.coordinates = [34.019269, -118.494344];

  $scope.search = function (location, activity) {
    ExpediaInfo.getExpInfo(location, activity)
    .then(function (results) {
      $scope.results = results.data.activities;
      console.log($scope.results) // attributes of activities
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.clickInfo = function (result) {
    $scope.inputTitle = result.title;
    $scope.inputAddress = result.latLng;
    $scope.duration = result.duration;
    $scope.imageUrl = result.imageUrl;
    $scope.latLng = result.latLng;
    $scope.coordinates = "[" + result.latLng + "]";
  };

  $scope.getAddress = function (latlng) {
    GoogleGeocodeInfo.getAddress(latlng)
    .then(function (address) {
      $scope.address = address.data.results[0].formatted_address;
    })
  };

  $scope.getDateTime = function () {
    $scope.datetimeValue = new Date();
  };

  $scope.postEvent = function (inputTitle, address, datetimeValue, duration, imageUrl) {
    Event.submitEvent({inputTitle: inputTitle, address: address, latlng: $scope.coordinates, datetimeValue: datetimeValue, duration: duration, Email: $scope.email, imageUrl: imageUrl })
      .then(function() {
        $scope.inputTitle = null;
        $scope.duration = null;
        $scope.imageUrl = null;
        $scope.datetimeValue = null;
        $scope.address = null;
        $scope.latLng = null;
      })
      .then(function() {
        console.log('event added');
        $state.go('app.myEvents');
      });
  }

  $scope.clearFields = function () {
    $scope.inputTitle = null;
    $scope.duration = null;
    $scope.imageUrl = null;
    $scope.datetimeValue = null;
    $scope.address = null;
    $state.go($state.current, {}, {reload: true, inherit: false});
  }

  NgMap.getMap().then(function(map) {});

});
