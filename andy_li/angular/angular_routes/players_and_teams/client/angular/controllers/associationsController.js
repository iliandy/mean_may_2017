appMod.controller('AssociationsController', function(PlayerFactory, TeamFactory) {
  console.log("Initializing AssociationsController...");
  var self = this;
  self.players = [];
  self.teams = [];

  self.getPlayers = function() {
    PlayerFactory.getPlayers(function(players) {
      self.players = players;
    });
  };
  self.getTeams = function() {
    TeamFactory.getTeams(function(teams) {
      self.teams = teams;
    });
  };

  self.createAssociation = function(newAssociation) {
    PlayerFactory.createAssociation(newAssociation, function() {
      self.getPlayers();
      self.newAssociation = {};
    });
  };
  self.deleteAssociation = function(player) {
    PlayerFactory.deleteAssociation(player, function() {
      self.getPlayers();
      console.log(player);
    });
  };

});
