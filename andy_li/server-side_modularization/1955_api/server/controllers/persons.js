var mongoose = require("mongoose");
var Person = mongoose.model('Person');

module.exports = {
  index: function(req, res) {
    Person.find({}).exec(function(err, persons) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      console.log(persons);
      return res.json(persons);
    });
  },
  create_person: function(req, res) {
    var person = new Person({
      name: req.params.name,
    });

    person.save(function(err, person) {
      if(err) {
        console.log("Error in adding person:", err);
        return res.json(err);
      }
      console.log("Person added:", person);
      return res.redirect('/');
    });
  },
  delete_person: function(req, res) {
    Person.find({name:req.params.name}).remove().exec(function(err, person) {
      if(err) {
        console.log("Error in deleting person:", err);
        return res.json(err);
      }
      if(!person) {
        return res.json(`${person} not found.`);
      }
      return res.redirect("/");
    }); // end person id query

  },
  show_person: function(req, res) {
    Person.find({name:req.params.name}).exec(function(err, person) {
      if(err) {
        console.log("Error in displaying person:", err);
        return res.json(err);
      }
      if(!person){
        return res.json(`${person} not found.`);
      }
      console.log("Person displayed:", person);
      return res.json(person);

    });
  },

}
