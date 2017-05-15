angular.module('starter.services', [])

  .factory("ircListener", function ($cordovaSQLite) {
    return {
      getAll: function (db) {
        console.log("running db query");
        return $cordovaSQLite.execute(db, "SELECT * FROM tblChats ORDER BY time");
      },

      saveMessage: function(db, message) {
        console.log("saving message: " + message)
        var contents = message.contents;

        //TODO create UUID for each message here
        var messageID = 0;

        var server = message.server;
        var cahnnel = message.channel;
        var time = message.time;

        var query = "INSERT INTO tblChats (serverID, channel messageID, time, contents) VALUES (?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [server, channel, messageID, time, sender, contents]);
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
