appMod.controller('TeamsController', function(TeamFactory) {
  console.log("Initializing TeamsController...");
  var self = this;
  self.teams = [];

  self.getTeams = function() {
    TeamFactory.getTeams(function(teams) {
      self.teams = teams;
    });
  };
  self.createTeam = function(newTeam) {
    console.log(self.newTeam);
    TeamFactory.createTeam(newTeam, function() {
      self.getTeams();
      self.newTeam = {};
    });
  };
  self.deleteTeam = function(team) {
    TeamFactory.deleteTeam(team, function () {
      self.getTeams();
    });
  };
});
