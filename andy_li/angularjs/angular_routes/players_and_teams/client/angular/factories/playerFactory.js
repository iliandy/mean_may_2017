appMod.factory("PlayerFactory", function() {
  var self = this;
  var factory = {};
  var players = [
    //name:
    //team:
    {name: "Mo", team: null},
    {name: "Jo", team: null},
    {name: "Bo", team: null},
  ];
  factory.getPlayers = function(callback) {
    callback(players);
  };
  factory.createPlayer = function(newPlayer, callback) {
    newPlayer.team = null;
    players.push(newPlayer);
    callback();
  };
  factory.deletePlayer = function(player, callback) {
    var i = players.indexOf(player);
    players.splice(i, 1);
    callback();
  };
  factory.createAssociation = function(newAssociation, callback) {
    for(let i = 0; i < players.length; i++) {
      if (players[i].name == newAssociation.player.name) {
        players[i].team = newAssociation.team;
      }
    }
    callback();
  };
  factory.deleteAssociation = function(player, callback) {
    var i = players.indexOf(player);
    players[i].team = null;
    callback();
  };
  factory.show = function(name, callback) {
    for(let i = 0; i < players.length; i++) {
      if (players[i].name == name) {
        callback(players[i]);
        return;
      }
    }
    callback(false);
  };

  return factory;
});
