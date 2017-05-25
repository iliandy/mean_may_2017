var app = angular.module("app", ["ngRoute", "ngCookies"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "partials/login_reg.html",
    controller: "UsersController as UC",
  })
  .when("/home", {
    templateUrl: "partials/home.html",
    controller: "UsersController as UC",
  })
  .otherwise({ redirectTo: "/" });


});
