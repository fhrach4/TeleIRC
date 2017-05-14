angular.module('starter.services', [])

  .factory("ircListener", function () {
    return {};
  })

  .factory("serverSettings", function ($q, $http) {
    return {
      all: function () {
        return $http.get('data/servers.json').then(function (response) {
          return response.data['servers'];
        });
      },
      get: function (serverID) {
        return $http.get('data/servers.json').then(function (response) {
          console.log(serverID);
          return response.data['servers'][serverID];
        });
      }
    }
  });
