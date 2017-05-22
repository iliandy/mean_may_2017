app.factory("FriendFactory", function($http) {
  var factory = {};
  factory.index = function(callback) {
    //call this method if you want to update or set the friends variable
    $http.get("/friends").then(callback);
  };
  factory.show = function(id, callback) {
    $http.get(`/friends/${id}`).then(callback);
  };
  factory.create = function(newFriend, callback) {
    $http.post("/friends", newFriend).then(callback);
  };
  factory.update = function(id, editFriend, callback) {
    $http.put(`/friends/${id}`, editFriend).then(callback);
  };
  factory.delete = function(id, callback) {
    $http.delete(`/friends/${id}`).then(callback);
  };
  return factory;
});
