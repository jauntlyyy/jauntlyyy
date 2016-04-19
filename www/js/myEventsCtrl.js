angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($http, $scope, $state, $ionicHistory, Auth, Event, GoogleGeocodeInfo) {
  $scope.data;
  $scope.id;
  $scope.eventIDs;
  $scope.address;
  $scope.filtered = [];

  $scope.getMine = function() {
    Event.getMyEvents(Auth.authData.facebook.email).then(function(data) {
      $scope.data = data.data
    })
    .then(function() {
      Event.getMyID(Auth.authData.facebook.email).then(function(data) {
      $scope.id = data.data[0].id;
      })
      .then(function() {
        Event.postID($scope.id).then(function(data) {
        $scope.eventIDs = data.data;
      })
        .then(function () {
          for (var i = 0; i < $scope.data.length; i++) {
            for (var j = 0; j < $scope.eventIDs.length; j++) {
              if ($scope.data[i].id === $scope.eventIDs[j].EventID) {
                $scope.filtered.push($scope.data[i]);
              }
            }
          }
        })
      })
    })
  };

  $scope.deleteEvent = function(id) {
    Event.deleteEvent(id).then(function() {
      $state.go($state.current, {}, {reload: true, inherit: false});
      console.log('event deleted');
    })
  };

  $scope.sendIDToDB = function () {
    console.log($scope.id);
  };

  $scope.unjoinEvent = function(eventid) {
    Event.unjoinEvent(eventid, $scope.id).then(function() {
      $state.go($state.current, {}, {reload: true, inherit: false});
      console.log('event unjoined');
    });
  };

  $scope.getMine();
});
