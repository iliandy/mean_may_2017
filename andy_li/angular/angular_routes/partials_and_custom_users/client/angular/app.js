var appMod = angular.module("app", ["ngRoute"]);

appMod.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "static/partials/customizeUsers.html",
    controller: "CustomizeUsersController as CUC",
  })
  .when("/user_list", {
    templateUrl: "static/partials/userList.html",
    controller: "UsersListController as ULC",
  })
  .otherwise({ redirectTo: "/" })
});

appMod.factory("UserFactory", function() {
  var factory = {};
  factory.users = [
    //first_name:
    //last_name:
    //fav_lang:
    {first_name: "Mo", last_name: "Jo", fav_lang: "JavaScript"},
  ];
  factory.getUsers = function(callback) {
    callback(this.users);
  };
  factory.createUser = function(newUser, callback) {
    factory.users.push(newUser);
    callback();
  };
  factory.deleteUser = function(user, callback) {
    var i = factory.users.indexOf(user);
    factory.users.splice(i, 1);
    callback();
  };
  factory.showUser = function(user, callback) {
    var i = factory.users.indexOf(user);
    factory.users[i];
    callback();
  }

  return factory;
});



appMod.controller('CustomizeUsersController', function(UserFactory) {
  var self = this;

  self.getUsers = function() {
    UserFactory.getUsers(function(users) {
      self.users = users;
    });
  };
  self.createUser = function(newUser) {
    console.log(self.newUser);
    UserFactory.createUser(newUser, function() {
      self.getUsers();
      self.newUser = {};
    });
  };
  self.deleteUser = function(user) {
    UserFactory.deleteUser(user, function () {
      self.getUsers();
    });
  };
});

appMod.controller('UsersListController', function(UserFactory) {
  var self = this;

  self.getUsers = function() {
    UserFactory.getUsers(function(users) {
      self.users = users;
    });
  };

});
