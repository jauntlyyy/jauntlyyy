angular.module('jauntly.addEventCtrl', [])

.controller('addEventCtrl', function ($scope, $state, ExpediaInfo, GoogleGeocodeInfo, Auth, Event) {

  $scope.results = {};
  $scope.address;
  $scope.email = Auth.authData.facebook.email;

  $scope.search = function (location, activity) {
    ExpediaInfo.getExpInfo(location, activity)
    .then(function (results) {
      $scope.results = results.data.activities;
      console.log('ajax get results ', $scope.results);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.clickInfo = function (result) {
    $scope.inputTitle = result.title;
    $scope.inputAddress = result.latLng;
    $scope.duration = result.duration;
  };

  $scope.getAddress = function (latlng) {
    GoogleGeocodeInfo.getAddress(latlng)
    .then(function (address) {
      $scope.address = address.data.results[0].formatted_address;
    })
  };

  $scope.getDateTime = function () {
    $scope.datetimeValue = new Date();
    console.log($scope.datetimeValue);
  };

  $scope.postEvent = function (inputTitle, address, datetimeValue, duration) {
    // $scope.email = Auth.authData.facebook.email;
    console.log('email: ', $scope.email);
    Event.submitEvent({inputTitle: inputTitle, address: address, datetimeValue: datetimeValue, duration: duration, Email: $scope.email})
      .then(function() {
        console.log('event added');
      });
    // Event.submitEvent();
  }

})
  .run(function (Auth, $state) {
    console.log('token on run' , window.localStorage.getItem('token'));
    if (window.localStorage.getItem('token') === null) {
      // $state.reload();
      console.log('token is null');
      $state.go('app.login');
    }
  });
