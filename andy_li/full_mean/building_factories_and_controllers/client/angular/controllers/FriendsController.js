app.controller("FriendsController", function(FriendFactory, $location) {
  console.log("Initializing FriendsController...");
  var self = this;
  self.friends = [];
  self.friend = {};
  self.errors = [];

  self.index = function() {
    FriendFactory.index(function(res) {
      console.log(res);
      self.friends = res.data;
    });
  };

  self.create = function(newFriend) {
    console.log("Add friend clicked.");
    self.errors = [];
    FriendFactory.create(newFriend, function(res) {
      // clear our new Friend object so user can re-enter form input
      // self.newFriend = {};
      // if there are errors in response, add each error message to errors array to display on front end
      if(res.data.errors) {
        for(key in res.data.errors) {
          var error = res.data.errors[key];
          self.errors.push(error.message);
        }
      }
      else {
        $location.url("/friends");
      }
    });   // end of FriendFactory create method
  };    // end of self.create method

  // self.show = function() {
  //   FriendFactory.show($routeParams.id, function(friend) {
  //     // friend not found, redirect to /friends
  //     if(friend == false) {
  //       $location.url("/friends");
  //     }
  //     // friend found, set friend found to controller friend object to be displayed
  //     else {
  //       self.friend = friend;
  //       console.log(self.friend);
  //     }
  //   });   // end of FriendFactory show method
  // };    // end of self.show method
  //
  // self.update = function() {
  //   FriendFactory.update($routeParams.id, function(friend) {
  //     if(friend == false) {
  //       $location.url("/friends");
  //     }
  //     else {
  //       self.friend = friend;
  //       console.log(self.friend);
  //     }
  //   });
  // };

});
