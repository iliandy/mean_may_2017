app.factory("CommentFactory", function($http) {
  var factory = {};

  factory.index = function(callback) {
    $http.get("/comments").then(callback);
  };
  factory.create = function(newCom, callback) {
    $http.post("/comments", newCom).then(callback);
  };
  factory.delete = function(id, callback) {
    $http.delete(`/comments/${id}`).then(callback);
  };

  return factory;
})
