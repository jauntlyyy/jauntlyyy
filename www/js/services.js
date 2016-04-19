angular.module('jauntly.services', [])

.factory('ExpediaInfo', function ($http) {

  var getExpInfo = function (location, activity) {

    var params = {
      location: location,
      activity: activity,
      apikey: expKey,
      limitTo: 5
    };

    var config = {params: params};
    return $http.get('http://terminal2.expedia.com/x/activities/search', config);
  };

  return {
    getExpInfo : getExpInfo
  };
})
  
.factory('GoogleGeocodeInfo', function ($http) {

  var getAddress = function (latlng) {

    var params = {
      latlng: latlng,
      key: googleMapsApiKey
    };

    var config = {params: params};
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json', config);
  };

  return {
    getAddress : getAddress
  };
})
  
.factory("Auth", function($firebaseAuth) {

  var ref = new Firebase(firebaseKey);
  var auth = $firebaseAuth(ref);
  var authData = null;
  var isSignedIn = false;

  return {
    ref : ref,
    auth: auth,
    authData: authData,
    isSignedIn: isSignedIn
  }
})

.factory("FB", function($http) {
  var postEmail = function (email) {
    var plugin = {Email: email};
    return $http.post('/api/login/user', plugin);
  };
  return {
    postEmail: postEmail
  }
})

.factory("Event", function($http) {
  var getAllEvents = function (email) {
    var plugin = {Email: email};
    return $http.get('/api/events/events', plugin);
  };

  var submitEvent = function (data) {
    return $http.post('/api/events/events', data);
  };

  var getMyEvents = function () {
    return $http.get('/api/events/events');
  };

  var getMyID = function (data) {
    var plugin = {Email: data};
    return $http.post('/api/users/users', plugin);
  };

  var postToJoint = function (eventID, userID) {
    var plugin = {eventID: eventID, userId: userID};
    return $http.post('/api/join/events', plugin);
  };

  var postID = function (userID) {
    var plugin = {userId: userID};
    return $http.post('/api/filter/events', plugin);
  };

  var deleteEvent = function (id) {
    var params = {id: id};
    var config = {params: params};
    var url = '/api/myevents/' + id;
    return $http.delete(url, config);
  };

  var unjoinEvent = function(eventid, userid) {
    var params= {EventID: eventid, UserId: userid};
    var config = {params: params};
    var url = '/api/unjoinevent/' + eventid;
    return $http.delete(url, config);
  };

  return {
    getAllEvents: getAllEvents,
    submitEvent: submitEvent,
    getMyEvents: getMyEvents,
    getMyID: getMyID,
    postToJoint: postToJoint,
    postID: postID,
    unjoinEvent: unjoinEvent,
    deleteEvent: deleteEvent
  }
});

