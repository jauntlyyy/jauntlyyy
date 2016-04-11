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

  return {
    ref : ref,
    auth: auth
  }

});
// .factory("Credentials", function(Auth) {
//   var isLoggedIn = function(){
//     if (Auth.authData.facebook.accessToken) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   return {
//     isLoggedIn : isLoggedIn
//   }
// });

