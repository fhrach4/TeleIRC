angular.module('starter.services', [])

  .factory("ircListener", function ($cordovaSQLite) {
    return {
      getAll: function (db, serverID, channel) {
        var query = "SELECT * FROM tblChats WHERE (channel == '" + channel + "' AND serverID == '" + serverID + "') ORDER BY time;"
        console.log(query);
        return $cordovaSQLite.execute(db, query);
      },

      sendMessage: function (db, message) {
        console.log("saving message: " + message)
        var contents = message.contents;

        //TODO create UUID for each message here
        var messageID = 0;

        var server = message.server;
        var channel = message.channel;
        var time = message.time;
        var sender = message.sender;

        var query = "INSERT INTO tblChats (serverID, channel, messageID, time, sender, contents) VALUES (?,?,?,?,?,?)";
        console.log(query);
        console.log([server, channel, messageID, time, sender, contents]);
        $cordovaSQLite.execute(db, query, [server, channel, messageID, time, sender, contents]);
      },

      listen: function (url) {

      }
    }
  })

  .factory("serverSettings", function ($cordovaSQLite) {
    return {
      settings: function (db, serverID) {
        var query = "SELECT * FROM tblServers WHERE serverID == '" + serverID + "';";
        console.log(query);
        return $cordovaSQLite.execute(db, query);
      },
      names: function (db) {
        var query = "SELECT title, serverID FROM tblServers";
        return $cordovaSQLite.execute(db, query);
      },

      channels: function (db, serverID) {
        var query = "SELECT * FROM tblChannels WHERE serverID == '" + serverID + "';";
        console.log(query);
        return $cordovaSQLite.execute(db, query);
      },

      highlights: function (db, serverID) {
        var query = "SELECT * FROM tblHighlights WHERE serverID == '" + serverID + "';";
        console.log(query);
        return $cordovaSQLite.execute(db, query);
      },

      addChannel: function (db, serverID, newChannel) {
        var query = "INSERT INTO tblChannels VALUES ('" + serverID + "', '" + newChannel + "');";
        console.log(query);
        $cordovaSQLite.execute(db, query);
      },

      addHighlight: function (db, serverID, newHighlight) {
        var query = "INSERT INTO tblHighlights VALUES ('" + serverID + "', '" + newHighlight + "');";
        console.log(query);
        $cordovaSQLite.execute(db, query);
      },

      deleteHighlight: function (db, serverID, highlight) {
        var query = "DELETE FROM tblHighlights WHERE (serverID = '" + serverID + "' AND highlight = '" + highlight + "');"
        console.log(query);
        $cordovaSQLite.execute(db, query);
      },

      deleteChannel: function (db, serverID, channel) {
        var query = "DELETE FROM tblChannels WHERE (serverID = '" + serverID + "' AND channel = '" + channel + "');"
        console.log(query);
        $cordovaSQLite.execute(db, query);
      },

      setNick: function (db, serverID, newNick) {
        var query = "UPDATE tblServers SET nick = '" + newNick + "' WHERE serverID == '" + serverID + "';";
        console.log(query);
        $cordovaSQLite.execute(db, query);
      },

      setAddress: function (db, serverID, newAddress) {
        var query = "UPDATE tblServers SET address = '" + newAddress + "' WHERE serverID == '" + serverID + "';";
        console.log(query);
        $cordovaSQLite.execute(db, query);
      },

      setTimestamps: function (db, serverID, value) {
        var query = "UPDATE tblServers SET timestamps = '" + value + "' WHERE serverID == '" + serverID + "';";
        console.log(query);
        $cordovaSQLite.execute(db, query);
      }
    }
  });
