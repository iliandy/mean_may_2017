var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "/partials/friends.html",
    controller: "FriendsController as FC",
  })
  .when("/new", {
    templateUrl: "/partials/new.html",
    controller: "FriendsController as FC",
  })
  .when("/show/:id", {
    templateUrl: "/partials/show.html",
    controller: "FriendsController as FC",
  })
  .when("/edit/:id", {
    templateUrl: "/partials/edit.html",
    controller: "FriendsController as FC",
  })
  .otherwise({ redirectTo: "/" })
});
