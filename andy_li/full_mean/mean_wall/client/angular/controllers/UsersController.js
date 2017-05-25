app.controller("UsersController", function(UserFactory, $cookies, $location) {
  console.log("Loaded UsersController...");
  var self = this;
  self.regErrors = [];
  self.loginErrors = [];
  self.currentUser = {};

  self.create = function(newUser) {
    self.regErrors = [];
    // password does not match confirm password
    if(newUser.password != newUser.confirm_pwd) {
      self.regErrors.push("Passwords don't match.");
      // clear our new User object so user can re-enter form input
      self.newUser = {};
      return;
    }

    UserFactory.create(newUser, function(res) {
      // if there are errors in response, add each error message to regErrors array to display on front end
      if(res.data.errors) {
        for(key in res.data.errors) {
          var error = res.data.errors[key];
          self.regErrors.push(error.message);
        }
      }
      // duplicate e-mail used for registration
      if(res.data.errmsg) {
        self.regErrors.push(res.data.errmsg);
      }
      // registration successful, save User object into session cookie
      else {
        var user = res.data;
        $cookies.putObject("user", user);
        console.log(user);
        // redirect to home dashboard
        $location.url("/home");
      }
      // clear our new User object so user can re-enter form input
      self.newUser = {};

    });
  };

  self.session = function() {
    // User login status
    var loginStatus = UserFactory.session();
    // if not logged in, redirects user to / (login_reg.html)
    if(!loginStatus) {
      $location.url("/");
    }
  };

  self.logout = function() {
    $cookies.remove("user");
    $location.url("/");
  };

  self.login = function(loginUser) {
    self.loginErrors = [];

    UserFactory.login(loginUser, function(res) {
      self.loginUser = {};
      // if there are errors in response, add each error message to regErrors array to display on front end
      if(res.data.errors) {
        for(key in res.data.errors) {
          var error = res.data.errors[key];
          self.loginErrors.push(error.message);
        }
      }
      else{
        // login successful, save User object into session cookie
        var user = res.data;
        $cookies.putObject("user", user);
        console.log(user);
        // redirect to home dashboard
        $location.url("/home");
      }
    });
  };

  self.getUser = function() {
    self.currentUser = $cookies.getObject("user");
  };


});
