angular.module('starter.services', [])

  .factory("ircListener", function ($cordovaSQLite) {
    return {
      getAll: function (db, serverID, channel) {
        var querry = "SELECT * FROM tblChats WHERE (channel == '" + channel + "' AND serverID == '" + serverID + "') ORDER BY time;"
        console.log(querry);
        return $cordovaSQLite.execute(db, querry);
        // return $cordovaSQLite.execute(db, "SELECT * FROM tblChats WHERE serverID == 'aX4j9Z' AND channel == 'general' ORDER BY time;");
      },

      sendMessage: function(db, message) {
        console.log("saving message: " + message)
        var contents = message.contents;

        //TODO create UUID for each message here
        var messageID = 0;

        var server = message.server;
        var channel = message.channel;
        var time= message.time;
        var sender = message.sender;

        var query = "INSERT INTO tblChats (serverID, channel, messageID, time, sender, contents) VALUES (?,?,?,?,?,?)";
        console.log(query);
        console.log( [server, channel, messageID, time, sender, contents]);
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
