var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/friends/new", {
    templateUrl: "/partials/new.html",
  })
  .when("/friends/edit/:id", {
    templateUrl: "/partials/edit.html",
  })
  .otherwise({ redirectTo: "/friends" })
});
