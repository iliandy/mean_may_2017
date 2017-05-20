appMod.factory("TeamFactory", function() {
  var self = this;
  var factory = {};
  var teams = [
    //name:
    {name: "Mavericks"},
    {name: "Cowboys"},
    {name: "Rangers"},
  ];
  factory.getTeams = function(callback) {
    callback(teams);
  };
  factory.createTeam = function(newTeam, callback) {
    teams.push(newTeam);
    callback();
  };
  factory.deleteTeam = function(team, callback) {
    var i = teams.indexOf(team);
    teams.splice(i, 1);
    callback();
  };

  return factory;
});
