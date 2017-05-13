angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {
  })

  .controller('ServerCtrl', function ($scope, $http, $state) {

    // load JSON
    $http.get('data/servers.json').success(
      function (data) {
        $scope.servers = data["servers"];
      }
    );
  })

  .controller('ServerSettingCtrl', function ($scope, $http, $state) {
    var server_id = $state.params.serverID;

    // load JSON
    $http.get('data/servers.json').success(
      function (data) {
        $scope.server_title = data[server_id].title;
        $scope.timestamps = data[server_id].timestamps;
        $scope.notifications = data[server_id].notifications;
        $scope.highlights = data[server_id].highlights;
        $scope.address = data[server_id].address;
        $scope.nick = data[server_id].nick;
        $scope.channels = data[server_id].channels;
      });
  })

  .controller('ChatCtrl', function ($scope, $http, $state) {

  });
