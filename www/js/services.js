angular.module('starter.services', [])

  .factory("ircListener", function ($cordovaSQLite) {
    return {
      showDatabases: function (db) {
        console.log("running db query");
        return $cordovaSQLite.execute(db, "SELECT * FROM tblChats");
      }
    }
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
