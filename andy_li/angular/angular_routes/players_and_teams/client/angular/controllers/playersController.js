appMod.controller('PlayersController', function(PlayerFactory, $routeParams, $location) {
  console.log("Initializing PlayersController...");
  var self = this;
  self.players = [];
  self.player = {};   // used to show single player

  self.getPlayers = function() {
    PlayerFactory.getPlayers(function(players) {
      self.players = players;
    });
  };
  self.createPlayer = function(newPlayer) {
    console.log(self.newPlayer);
    PlayerFactory.createPlayer(newPlayer, function() {
      self.getPlayers();
      self.newPlayer = {};
    });
  };
  self.deletePlayer = function(player) {
    PlayerFactory.deletePlayer(player, function() {
      self.getPlayers();
    });
  };
  self.show = function() {
    PlayerFactory.show($routeParams.name, function(player) {
      if(player == false) {
        $location.url("/players");
      }
      else {
        self.player = player;
        console.log(self.player);
      }
    });
  };
});
