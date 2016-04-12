// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('jauntly', ['ionic', 'ion-datetime-picker', 'firebase', 'jauntly.services', 'jauntly.appCtrl', 'jauntly.addEventCtrl', 'jauntly.menuCtrl', 'jauntly.myEventsCtrl'])

.factory('ParentFactory', function() {
  var loggedIn = false;
  return {
    loggedIn: loggedIn
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // OAuth.initialize(fbAppKey);

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

// Client side UI-Routing

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
    // controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    },
    resolve: {
      auth: function (Auth) {
        console.log('this is the Auth factory ', Auth);
        return Auth.auth.$requireAuth();
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.myEvents', {
      url: '/myevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/myEvents.html',
          controller: 'myEventsCtrl'
        }
      },
    resolve: {
      auth: function (Auth) {
        console.log('this is the Auth factory ', Auth);
        return Auth.auth.$requireAuth();
      }
    }
    })
    .state('app.addEvent', {
      url: '/addevent',
      views: {
        'menuContent': {
          templateUrl: 'templates/addEvent.html',
          controller: 'addEventCtrl'
        }
      },
      resolve: {
        auth: function (Auth) {
          console.log('this is the Auth factory ', Auth);
          return Auth.auth.$requireAuth();
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
   // We can catch the error thrown when the $requireAuth promise is rejected
   // and redirect the user back to the home page
   if (error === "AUTH_REQUIRED") {
     $state.go("app.login");
   }
  });
}]);
