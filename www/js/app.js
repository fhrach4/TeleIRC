// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js



angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicScrollDelegate, $cordovaFile) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      $rootScope.db = window.openDatabase("teleIRC.db", '1.0', 'Chats', 65536);

      // FOR DEBUG USE ONLY!!!!
      // $cordovaSQLite.execute($rootScope.db, "DROP TABLE IF EXISTS tblChats;").then( function () {
      //   console.log("DATABASE DELETED!")
      // });


      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS tblChats (serverID, channel, messageID, time, sender, contents)").then(function () {
        console.log("DB Created");
      });

      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS tblServers (serverID, title, address, nick, notifications, timestamps)").then(function () {
        console.log("serverDB Created");
      })

      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS tblHighlights (serverID, highlight)").then(function () {
        console.log("highlightDB Created");
      });

      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS tblChannels (serverID, channel)").then(function () {
        console.log("channelDB Created");
      });

      // INSERT TEST DATA
      //   $cordovaSQLite.execute($rootScope.db, "INSERT INTO tblChats (serverID, channel, messageID, time, sender, contents) VALUES (?,?,?,?,?,?)", ['aX4j9Z', 'dev', '1', new Date().getTime(), 'test_user', 'test message']);

      // $cordovaSQLite.execute($rootScope.db, "INSERT INTO tblServers (serverID, title, address, nick, notifications, highlights, channels, timestamps) VALUES (?,?,?,?,?,?,?,?,)", ['aX4j9Z', 'TestServer', '192.168.1.169', 'sekibanki', 'in_app', 

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/settings-menu.html',
        controller: 'AppCtrl'
      })

      .state('app.servers', {
        url: '/servers',
        views: {
          'menuContent': {
            templateUrl: 'templates/servers.html',
            controller: 'ServerCtrl'
          }
        }
      })

      .state('app.chat', {
        url: '/chat/:serverID/:channel',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat.html',
            controller: 'ChatCtrl'
          }
        }
      })

      .state('app.config', {
        url: '/servers/config/:serverID',
        views: {
          'menuContent': {
            templateUrl: 'templates/server-config.html',
            controller: 'ServerSettingCtrl'
          }
        }
      })

    // .state('app.servers.settings', {
    //   url: '/settings',
    //   templateUrl: 'templates/settings-menu.html',
    //   controller: 'SettingsCtrl'
    // })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/servers');

  });
