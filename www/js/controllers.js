angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, serverSettings) {
    serverSettings.names($scope.db).then(function (data) {
      var results = [];
      for (var i = 0; i < data.rows.length; i++) {
        var server = {}
        server.title = data.rows[i].title;
        server.id = data.rows[i].serverID;
        results.push(server);
      }

      $scope.servers = results;
    })
  })

  .controller('ServerCtrl', function ($scope, $http, $state, serverSettings) {

    serverSettings.names($scope.db).then(function (data) {
      var results = [];
      for (var i = 0; i < data.rows.length; i++) {
        var server = {}
        server.title = data.rows[i].title;
        server.id = data.rows[i].serverID;
        results.push(server);
      }

      $scope.servers = results;
    })
  })

  .controller('ServerSettingCtrl', function ($scope, $http, $state, ircListener, serverSettings, $ionicPopup) {
    var server_id = $state.params.serverID;

    serverSettings.settings($scope.db, server_id).then(function (data) {
      var data = data.rows[0];
      $scope.server_title = data.title;
      $scope.timestamps = data.timestamps;
      $scope.notifications = data.notifications;
      $scope.highlights = data.highlights;
      $scope.address = data.address;
      $scope.nick = data.nick;
    });

    $scope.updateChannels = function () {
      serverSettings.channels($scope.db, server_id).then(function (data) {
        var results = [];
        for (var i = 0; i < data.rows.length; i++) {
          results.push(data.rows[i].channel);
        }

        $scope.channels = results;
      });
    }
    $scope.updateChannels();

    $scope.updateHighlights = function () {
      serverSettings.highlights($scope.db, server_id).then(function (data) {
        var results = [];
        for (var i = 0; i < data.rows.length; i++) {
          results.push(data.rows[i].highlight);
        }

        $scope.highlights = results;
      });
    }
    $scope.updateHighlights();

    $scope.saveSettings = function () {
    };

    $scope.addChannel = function () {
      serverSettings.addChannel($scope.db, server_id, $scope.data.newChannel);
    }

    $scope.addHighlight = function () {
      serverSettings.addHighlight($scope.db, server_id, $scope.data.newHighlight);
    }

    $scope.showChannelDialogue = function () {
      $scope.data = {};

      var popup = $ionicPopup.show({
        template: "<input type = 'text' ng-model = 'data.newChannel'>",
        title: 'New Auto-Join Channel',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {

              if (!$scope.data.newChannel) {
                //don't allow the user to  unless he enters model...
                console.log($scope.data.newChannel);
                e.preventDefault();
              } else {
                return $scope.data.newChannel;
              }
            }
          }
        ]
      })

      popup.then(function (res) {
        $scope.addChannel();
        $scope.updateChannels();
      });
    };

    $scope.showHighlightDialogue = function () {
      $scope.data = {};

      var popup = $ionicPopup.show({
        template: "<input type = 'text' ng-model = 'data.newHighlight'>",
        title: 'New Highlight',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {

              if (!$scope.data.newHighlight) {
                //don't allow the user to  unless he enters model...
                console.log($scope.data.newHighlight);
                e.preventDefault();
              } else {
                return $scope.data.newHighlight;
              }
            }
          }
        ]
      })

      popup.then(function (res) {
        $scope.addHighlight();
        $scope.updateHighlights();
      });
    };
  })

  .controller('ChatCtrl', function ($scope, $http, $state, serverSettings, ircListener) {

    $scope.input = {
      'submit': ""
    };

    var server_id = $state.params.serverID;
    $scope.channel = $state.params.channel;

    serverSettings.channels($scope.db, server_id).then(function (data) {
      var results = [];
      for (var i = 0; i < data.rows.length; i++) {
        results.push(data.rows[i].channel);
      }

      $scope.channels = results;
    });

    serverSettings.settings($scope.db, server_id).then(function (data) {
      $scope.title = data.rows[0].title;
      $scope.serverID = server_id;
      $scope.nick = data.rows[0].nick;

      $scope.chatSubmit = function () {
        ircListener.sendMessage($scope.db, {
          'server': server_id,
          'channel': $state.params.channel,
          'contents': $scope.input.submit,
          'sender': $scope.nick,
          'time': Date.now()
        }
        );

        $scope.updateChat();
      };

      $scope.updateChat = function () {
        var db = ircListener.getAll($scope.db, server_id, $scope.channel);
        db.then(function (result) {
          var results = [];

          // passing in result.rows crashes on infinite loop for some reason, whatever, this works
          for (var i = 0; i < result.rows.length; i++) {
            var date = new Date(result.rows[i].time);

            var message = {};
            message.channel = result.rows[i].channel;
            message.contents = result.rows[i].contents;
            message.messageID = result.rows[i].messagID;
            message.sender = result.rows[i].sender;
            message.serverID = result.rows[i].serverID;
            message.time = date.toLocaleTimeString();
            results.push(message);
          }

          console.log(results);
          $scope.history = results;


        });
      };

      $scope.updateChat();
    })

  });
