angular.module('jauntly.searchCtrl', [])

.controller('searchCtrl', function($scope, Event, Auth) {
  $scope.data;
  $scope.myID;
  $scope.users;

  $scope.getSearchResult = function() {
  Event.getMyEvents(Auth.authData.facebook.email)
    .then(function(data) {
    $scope.data = data.data;
  })
    .then(function() {
      Event.getMyID(Auth.authData.facebook.email)
        .then(function(data) {
      $scope.myID = data.data[0].id;
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
      // Event.findCreator(id).then(function(data){
      //   //console.log('get creator id', data.data[0].userId)
      // });
    })
  };

  $scope.joinEvent = function(eventID) {
    Event.postToJoint(eventID, $scope.myID);
  };
  
  $scope.getSearchResult();
});
