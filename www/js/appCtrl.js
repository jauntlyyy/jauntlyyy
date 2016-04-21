angular.module('jauntly.appCtrl', [])

.controller('AppCtrl', function($scope, $state, Auth, ParentFactory, $timeout, FB) {
  
  $scope.isLoggedIn = false;
  $scope.data;
  $scope.fbid;

  $scope.login = function() {
    console.log('in login')
    Auth.auth.$authWithOAuthPopup('facebook', {remember: "sessionOnly", scope: "email"})
      .then(function(authData) {
        Auth.authData = authData;
        $scope.data = authData;
        $scope.fbid = authData.auth.uid.slice(9);
        console.log('uid',  $scope.fbid);
        window.localStorage.setItem('token', $scope.data.token);
        window.localStorage.setItem('displayName', $scope.data.facebook.displayName);
        $scope.displayName = window.localStorage.getItem('displayName');
        $scope.isLoggedIn = true;
        Auth.isSignedIn = true;
        return Auth.authData;
      })
      .then(function() {
        var data = {
          Email: Auth.authData.facebook.email,
          fbid: $scope.fbid,
          name: $scope.data.facebook.displayName
        };

        console.log('data', data)
        FB.postEmail(data).then(function() {
          console.log('email posted.');
        });
      })
      .catch(function(error) {
        console.log('error getting facebook auth ', error);
      })
  };

  $scope.logout = function () {
    Auth.ref.unauth();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('displayName');
    Auth.authData = null;
    Auth.isSignedIn = false;
    $scope.isLoggedIn = false;
    $state.reload();
  }
});

