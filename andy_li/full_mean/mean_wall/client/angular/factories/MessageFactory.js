app.factory("MessageFactory", function($http) {
  var factory = {};

  factory.index = function(callback) {
    $http.get("/messages").then(callback);
  };
  factory.create = function(newMsg, callback) {
    $http.post("/messages", newMsg).then(callback);
  };
  factory.delete = function(id, callback) {
    $http.delete(`/messages/${id}`).then(callback);
  };
  factory.addLikes = function(msg_id, user_id, callback) {
    $http.put(`/messages/likes/${msg_id}`, {user: user_id}).then(callback);
  };

  return factory;
});
