var Dragons = require("../controllers/dragons");

module.exports = function(app) {
  app.get("/", Dragons.index);
  app.get("/dragons/new", Dragons.create_dragon_form);
  app.post("/dragons", Dragons.create_dragon);
  app.get("/dragons/:id", Dragons.show_dragon);
  app.get("/dragons/edit/:id", Dragons.edit_dragon_form);
  app.post("/dragons/:id", Dragons.edit_dragon);
  app.post("/dragons/destroy/:id", Dragons.delete_dragon);
};
