angular.module('jauntly.appCtrl', [])

.controller('AppCtrl', function($scope, $state, Auth, ParentFactory, $timeout, FB) {
  
  $scope.isLoggedIn = false;
  $scope.data;

  $scope.login = function() {
    console.log('in login')
    Auth.auth.$authWithOAuthPopup('facebook', {remember: "sessionOnly", scope: "email"})
      .then(function(authData) {
        Auth.authData = authData;
        $scope.data = authData;
        window.localStorage.setItem('token', $scope.data.token);
        window.localStorage.setItem('displayName', $scope.data.facebook.displayName);
        $scope.displayName = window.localStorage.getItem('displayName');
        $scope.isLoggedIn = true;
        Auth.isSignedIn = true;
        return Auth.authData;
      })
      .then(function() {
        FB.postEmail(Auth.authData.facebook.email).then(function() {
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

