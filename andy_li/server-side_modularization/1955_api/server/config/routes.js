var Persons = require("../controllers/persons");

module.exports = function(app) {
  app.get("/", Persons.index);
  app.get("/new/:name", Persons.create_person);
  app.get("/remove/:name", Persons.delete_person);
  app.get("/:name", Persons.show_person);

};
