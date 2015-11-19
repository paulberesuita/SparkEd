// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sparked', ['ionic', 'youtube-embed', 'firebase'])

.run(function($ionicPlatform, $rootScope) {

    $rootScope.currentUserPathID = "";

    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
    });

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){

            //google.maps.event.addDomListener(window, "load", function(){
            //
            //    var LatLong = new google.maps.LatLng(37, -120);
            //    console.log(LatLong);
            //
            //    var mapOptions = {
            //        center: LatLong,
            //        zoom: 15,
            //        mapTypeId: google.maps.MapTypeId.ROADMAP
            //    };
            //
            //    var map =  new google.maps.Map(document.getElementById("map"), mapOptions);
            //
            //    navigator.geolocation.getCurrentPosition(function(pos){
            //
            //        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //
            //    });
            //
            //    $scope.map = map;
            //
            //});
            console.log("change transition");
    })

}).config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider


      .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/welcome/views/welcome.html',
        controller: 'WelcomeController as welcome'
      })
      .state('topics', {
          url: '/topics',
          templateUrl: 'app/topics/views/topics.html',
          controller: 'TopicsController as topics'
      })
      .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: 'app/tabs/tabs.html'
      })
      .state('tabs.home', {
          url: '/home',
          views: {
              'home-tab': {
                  templateUrl: 'app/home/views/home.html',
                  controller: 'HomeController as home'
              }
          }
      })
      .state('tabs.explore', {
          url: '/explore',
          views: {
              'explore-tab': {
                  templateUrl: 'app/explore/views/explore.html',
                  controller: 'ExploreController as explore'
              }
          }
      })
      .state('tabs.connect', {
          url: '/connect',
          views: {
              'connect-tab': {
                  templateUrl: 'app/connect/views/connect.html',
                  controller: 'ConnectController'
              }
          }
      })
      .state('tabs.profile', {
          url: '/profile',
          views: {
              'profile-tab': {
                  templateUrl: 'app/profile/views/profile.html',
                  controller: 'ProfileController as profile'
              }
          }
      });

      $urlRouterProvider.otherwise('/welcome');


    });
