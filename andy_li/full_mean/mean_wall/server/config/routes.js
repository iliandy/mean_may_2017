var Users = require("../controllers/users");
var Messages = require("../controllers/messages");
var Comments = require("../controllers/comments");

module.exports = function(app) {
  // User routes
  app.get("/users", Users.index);
  app.post("/users", Users.create);
  app.post("/sessions", Users.login);
  app.get("/users/:id", Users.show);
  app.delete("/users/:id", Users.delete);
  // Message routes
  app.get("/messages", Messages.index);
  app.post("/messages", Messages.create);
  app.get("/messages/:id", Messages.show);
  app.delete("/messages/:id", Messages.delete);
  app.put("/messages/likes/:id", Messages.addLikes);
  // Comment routes
  app.get("/comments", Comments.index);
  app.post("/comments", Comments.create);
  app.get("/comments/:id", Comments.show);
  app.delete("/comments/:id", Comments.delete);
}
