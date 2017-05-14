angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, serverSettings) {
    serverSettings.all().then(function (data) {
      console.log(data);
      $scope.servers = data;
    })
  })

  .controller('ServerCtrl', function ($scope, $http, $state, serverSettings) {

    serverSettings.all().then(function (data) {
      console.log(data);
      $scope.servers = data;
    })
  })

  .controller('ServerSettingCtrl', function ($scope, $http, $state, ircListener, serverSettings) {
    var server_id = $state.params.serverID;
    var data = serverSettings.get(server_id);

    serverSettings.all().then(function (data) {
      console.log(data);
      $scope.server_title = data[server_id].title;
      $scope.timestamps = data[server_id].timestamps;
      $scope.notifications = data[server_id].notifications;
      $scope.highlights = data[server_id].highlights;
      $scope.address = data[server_id].address;
      $scope.nick = data[server_id].nick;
      $scope.channels = data[server_id].channels;
    })
  })

  .controller('ChatCtrl', function ($scope, $http, $state, ircListener) {
  });
