angular.module('jauntly', ['ionic', 'ion-datetime-picker', 'firebase', 'angularMoment', 'jauntly.services', 'jauntly.appCtrl', 'jauntly.addEventCtrl', 'jauntly.menuCtrl', 'jauntly.myEventsCtrl', 'jauntly.searchCtrl', 'ngMap'])

.factory('ParentFactory', function() {
  var loggedIn = false;
  return {
    loggedIn: loggedIn
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
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
  })

  .state('app.search', {
    cache: false,
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    },
    resolve: {
      auth: function (Auth) {
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
      cache: false,
      url: '/myevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/myEvents.html',
          controller: 'myEventsCtrl'
        }
      },
    resolve: {
      auth: function (Auth) {
        return Auth.auth.$requireAuth();
      }
    }
    })

  .state('app.joinedEvents', {
      cache: false,
      url: '/joinedevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/joinedEvents.html',
          controller: 'myEventsCtrl'
        }
      },
    resolve: {
      auth: function (Auth) {
        return Auth.auth.$requireAuth();
      }
    }
    })
  
  .state('app.addEvent', {
      cache: false,
      url: '/addevent',
      views: {
        'menuContent': {
          templateUrl: 'templates/addEvent.html',
          controller: 'addEventCtrl'
        }
      },
      resolve: {
        auth: function (Auth) {
          return Auth.auth.$requireAuth();
        }
      }
    });

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
