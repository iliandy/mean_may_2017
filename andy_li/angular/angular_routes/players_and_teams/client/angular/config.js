var appMod = angular.module("app", ["ngRoute"]);

appMod.config(function($routeProvider) {
  $routeProvider
  .when("/players", {
    templateUrl: "static/partials/players.html",
    controller: "PlayersController as PC",
  })
  .when("/teams", {
    templateUrl: "static/partials/teams.html",
    controller: "TeamsController as TC",
  })
  .when("/associations", {
    templateUrl: "static/partials/associations.html",
    controller: "AssociationsController as AC",
  })
  .when("/players/:name", {
    templateUrl: "static/partials/player_show.html",
    controller: "PlayersController as PC",
  })
  .otherwise({ redirectTo: "/players" })
});
