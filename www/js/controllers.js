angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, serverSettings) {
    serverSettings.all().then(function (data) {
      // console.log(data);
      $scope.servers = data;
    })
  })

  .controller('ServerCtrl', function ($scope, $http, $state, serverSettings) {

    serverSettings.all().then(function (data) {
      // console.log(data);
      $scope.servers = data;
    })
  })

  .controller('ServerSettingCtrl', function ($scope, $http, $state, ircListener, serverSettings) {
    var server_id = $state.params.serverID;
    var data = serverSettings.get(server_id);

    serverSettings.all().then(function (data) {
      // console.log(data);
      $scope.server_title = data[server_id].title;
      $scope.timestamps = data[server_id].timestamps;
      $scope.notifications = data[server_id].notifications;
      $scope.highlights = data[server_id].highlights;
      $scope.address = data[server_id].address;
      $scope.nick = data[server_id].nick;
      $scope.channels = data[server_id].channels;
    })
  })

  .controller('ChatCtrl', function ($scope, $http, $state, serverSettings, ircListener) {

    $scope.input = {
      'submit': ""
    };



    console.log($state.params);
    var server_id = $state.params.serverID;
    $scope.channel = $state.params.channel;

    serverSettings.get(server_id).then(function (data) {
      // console.log(data);
      $scope.title = data.title;
      $scope.channels = data.channels;
      $scope.serverID = data.id;
      $scope.nick = data.nick;

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

          // TODO Ensure that the messages are sorted by time
          // THis should be done in the SQL query

          console.log(results);
          $scope.history = results;


        });
      };

      $scope.updateChat();
    })

  });
