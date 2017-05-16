angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, serverSettings) {
    serverSettings.names($scope.db).then(function (data) {
      // console.log(data);
      $scope.servers = data;
    })
  })

  .controller('ServerCtrl', function ($scope, $http, $state, serverSettings) {

    serverSettings.names($scope.db).then(function (data) {
      var results = [];
      for(var i = 0; i < data.rows.length; i++)
      {
        var server = {}
        server.title = data.rows[i].title;
        server.id = data.rows[i].serverID;
        results.push(server);
      }

      $scope.servers = results;
    })
  })

  .controller('ServerSettingCtrl', function ($scope, $http, $state, ircListener, serverSettings) {
    var server_id = $state.params.serverID;
    var data = serverSettings.setting(server_id);

    // serverSettings.settings().then(function (data) {
    //   // console.log(data);
    //   $scope.server_title = data[server_id].title;
    //   $scope.timestamps = data[server_id].timestamps;
    //   $scope.notifications = data[server_id].notifications;
    //   $scope.highlights = data[server_id].highlights;
    //   $scope.address = data[server_id].address;
    //   $scope.nick = data[server_id].nick;
    //   $scope.channels = data[server_id].channels;
    // });

    $scope.saveSettings = function() {
      
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
        for(var i = 0; i < data.rows.length; i++) {
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
