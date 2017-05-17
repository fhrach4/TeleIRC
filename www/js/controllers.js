angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, serverSettings, $ionicPopup) {
    $scope.updateServerList = function () {
      serverSettings.names($scope.db).then(function (data) {
        var results = [];
        for (var i = 0; i < data.rows.length; i++) {
          var server = {}
          server.title = data.rows[i].title;
          server.id = data.rows[i].serverID;
          results.push(server);
        }

        $scope.servers = results;
      });
    }

    $scope.showNewServerDialogue = function () {
      $scope.data = {};
      var popup = $ionicPopup.show({
        template: "<input type = 'text' ng-model = 'data.serverName'>",
        title: 'New Server',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Create</b>',
            type: 'button-positive',
            onTap: function (e) {

              if (!$scope.data.serverName) {
                e.preventDefault();
              } else {
                serverSettings.createServer($scope.db, $scope.data.serverName);
              }
            }
          }
        ]
      })

      popup.then(function (res) {
        console.log($scope.data.serverName);
        $scope.updateServerList();
      });
    };

    $scope.removeServer = function ($event) {

      $scope.data = {};
      $scope.data.serverID = $event.currentTarget.id;


      var popup = $ionicPopup.show({
        title: 'Delete Server',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Delete</b>',
            type: 'button-danger',
            onTap: function (e) {
              serverSettings.deleteServer($scope.db, $scope.data.serverID);
            }
          }
        ]
      })

      popup.then(function () {
        $scope.updateServerList();
      });
    };

    $scope.updateServerList();
  })

  .controller('ServerCtrl', function ($rootScope, $scope, $state, serverSettings) {

    $rootScope.updateServerList = function () {
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
    };

    $scope.updateServerList();
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
      serverSettings.setNick($scope.db, server_id, document.getElementById("inputNick").value);
      serverSettings.setAddress($scope.db, server_id, document.getElementById("inputAddress").value);
      // serverSettings.setTimestamps($scope.db, server_id, $scope.timestamps);
      console.log($scope);
    };

    $scope.addChannel = function () {
      serverSettings.addChannel($scope.db, server_id, $scope.data.newChannel);
    }

    $scope.addHighlight = function () {

      serverSettings.addHighlight($scope.db, server_id, $scope.data.newHighlight);
    }

    $scope.removeHighlight = function ($event, value) {

      $scope.data = {};
      $scope.data.highlight = $event.currentTarget.innerHTML.trim();

      var popup = $ionicPopup.show({
        title: 'Delete Highlight',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Delete</b>',
            type: 'button-danger',
            onTap: function (e) {
              serverSettings.deleteHighlight($scope.db, server_id, $scope.data.highlight);
            }
          }
        ]
      })

      popup.then(function () {
        $scope.updateHighlights();
      });
    }

    $scope.removeChannel = function ($event, value) {

      $scope.data = {};
      $scope.data.channel = $event.currentTarget.innerHTML.trim();

      var popup = $ionicPopup.show({
        title: 'Delete Auto-Join Channel',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Delete</b>',
            type: 'button-danger',
            onTap: function (e) {
              serverSettings.deleteChannel($scope.db, server_id, $scope.data.channel);
            }
          }
        ]
      })

      popup.then(function () {
        $scope.updateChannels();
      });
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
                $scope.addChannel();
              }
            }
          }
        ]
      })

      popup.then(function (res) {
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
                $scope.addHighlight();
              }
            }
          }
        ]
      })

      popup.then(function (res) {
        $scope.updateHighlights();
      });
    };


  })

  .controller('ChatCtrl', function ($scope, $state, $ionicScrollDelegate, serverSettings, ircListener) {

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
        document.getElementById("inputChatbox").value = "";
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


          $ionicScrollDelegate.$getByHandle(document.getElementById('listMessages'));
          $ionicScrollDelegate.scrollBottom();

        });
      };

      $scope.updateChat();
    })

  });
