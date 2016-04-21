angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($http, $scope, $state, $ionicHistory, Auth, Event, GoogleGeocodeInfo) {
  $scope.data;
  $scope.id;
  $scope.eventIDs;
  $scope.address;
  $scope.filtered = [];
  $scope.users;
//need to perfect it, remove the last two promises.
  $scope.getMine = function() {
    //get all events by user
    Event.getMyEvents(Auth.authData.facebook.email).then(function(data) {
      $scope.data = data.data
      console.log("in myEventsCtrl, data", $scope.data)
    })
    .then(function() {
      Event.getMyID(Auth.authData.facebook.email).then(function(data) {
        console.log('data line 16 myEventsCtrl', data)
      $scope.id = data.data[0].id;
      })
      .then(function() {
        Event.postID($scope.id).then(function(data) {
        $scope.eventIDs = data.data;
        console.log('myEventsCtrl line 23,$scope.eventIDs', $scope.eventIDs)
      })
        .then(function () {
          for (var i = 0; i < $scope.data.length; i++) {
            for (var j = 0; j < $scope.eventIDs.length; j++) {
              if ($scope.data[i].id === $scope.eventIDs[j].EventID) {
                console.log('every event', $scope.data[i]);
                $scope.filtered.push($scope.data[i]);
              }
            }
          }
        })
      })
    })
  };

  $scope.showAttendees = function(id) {
    //get all attendees info array
    Event.getAttendees(id).then(function(data) {
      console.log('data in showAttendees', data.data);
    console.log('$scope.users', $scope.users);
      $scope.users = data.data;
      //get creator id
      Event.findCreator(id).then(function(data){
        console.log('get creator id', data.data[0].userId)
      });
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
