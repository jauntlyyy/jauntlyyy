angular.module('jauntly.services', [])

.factory('ExpediaInfo', function ($http) {
  var getExpInfo = function (location, activity) {
    return $http({
      method      : 'GET',
      contentType : 'application/json',
      params      : {
        location   : location,
        activity   : activity,
        apikey     : expKey,
        limitTo    : 5
      },
      url         : 'http://terminal2.expedia.com/x/activities/search'
    })
  };
  return {
    getExpInfo : getExpInfo
  };
})


.factory('GoogleGeocodeInfo', function ($http) {
  var getAddress = function (latlng) {
    return $http({
      method      : 'GET',
      contentType : 'application/json',
      params      : {
        latlng : latlng,
        key    : googleMapsApiKey
      },
      url         : 'https://maps.googleapis.com/maps/api/geocode/json'
    })
  };
  return {
    getAddress : getAddress
  };
})


.factory("Auth", function($firebaseAuth) {

  var ref = new Firebase("https://amber-fire-6746.firebaseio.com");
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

.factory("FB", function($http, Auth) {
  var postEmail = function (email) {
    var plugin = {Email: email}
    console.log(plugin);
    return $http.post('/api/login', plugin);
  }
  return {
    postEmail: postEmail
  }
})

.factory("Event", function($http) {
  var getAllEvents = function (email) {
    var plugin = {Email: email};
    console.log('email: ', email);
    return $http.get('/api/events/events', plugin);
  }

  var submitEvent = function (data) {
    console.log('inside submit', data);
    return $http.post('/api/events/events', data);
  }

  return {
    getAllEvents: getAllEvents,
    submitEvent: submitEvent
  }
});


