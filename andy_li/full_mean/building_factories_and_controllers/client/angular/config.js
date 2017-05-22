var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/friends/new", {
    templateUrl: "/partials/new.html",
    controller: "FriendsController as FC",
  })
  .when("/friends/edit/:id", {
    templateUrl: "/partials/edit.html",
    controller: "FriendsController as FC",
  })
  .otherwise({ redirectTo: "/friends" })
});
