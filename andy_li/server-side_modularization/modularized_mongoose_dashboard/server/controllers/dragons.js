var mongoose = require("mongoose");
var Dragon = mongoose.model('Dragon');

module.exports = {
  index: function(req, res) {
    console.log("-= Reached / (index.ejs) =-");
    Dragon.find({}).exec(function(err, dragons) {
      if (err) {
        res.json(err);
        console.log(err);
      }
      else {
        console.log(dragons);
        res.render("index.ejs", {dragons: dragons});
      }
    });
  },
  create_dragon_form: function(req, res) {
    console.log("-= Reached /dragons/new (new_dragon.ejs) =-");
    res.render("new_dragon.ejs");
  },
  create_dragon: function(req, res) {
    console.log("-= Reached /dragons (redirect to /) =-");
    console.log("POST data:", req.body);

    var dragon = new Dragon({
      name: req.body.name,
      owner: req.body.owner,
    });

    dragon.save(function(err, dragon) {
      if(err) {
        console.log("Error in adding dragon:", err);
        res.json(err);
      }
      else { // else console.log added dragon and redirect to dragons route (/dragons)
        console.log("Dragon added:", dragon);
        res.redirect('/');
      }
    });
  },
  show_dragon: function(req, res) {
    console.log("-= Reached /dragons/id (dragon.ejs) =-");
    Dragon.findById(req.params.id).exec(function(err, dragon) {
      if(err) {
        console.log("Error in displaying dragon:", err);
        res.json(err);
      }
      if(!dragon){
        res.json(`${dragon} not found.`);
      }
      else {
        console.log("Dragon displayed:", dragon);
        res.render("dragon.ejs", {dragon: dragon});
      }

    });
  },
  edit_dragon_form: function(req, res) {
    console.log("-= Reached /dragons/edit/id (edit_dragon.ejs) =-");
    Dragon.findById(req.params.id).exec(function(err, dragon) {
      if(err) {
        console.log("Error in displaying dragon:", err);
        res.json(err);
      }
      if(!dragon){
        res.json(`${dragon} not found.`)
      }
      else {
        console.log("Dragon displayed:", dragon);
        res.render("edit_dragon.ejs", {dragon: dragon});
      }

    });
  },
  edit_dragon: function(req, res) {
    console.log("-= Reached /dragons/id (post) (redirect to /dragons/id (get)) =-");
    Dragon.findById(req.params.id).exec(function(err, dragon) {
      if(err) {
        console.log("Error in editing dragon:", err);
        res.json(err);
      }
      if(!dragon) {
        res.json(`${dragon} not found.`);
      }
      else {
        // edit specific dragon with form data
        dragon.name = req.body.name;
        dragon.owner = req.body.owner;
        dragon.save(function(err, dragon) {
          if(err){
            res.json(err);
          }
          else {
            console.log("Dragon after edit:", dragon);
            res.redirect(`/dragons/${req.params.id}`);
          }
        }); // end dragon edit save
      }
    }); // end dragon id query

  },
  delete_dragon: function(req, res) {
    console.log("-= Reached /dragons/destroy/id (redirect to /) =-");
    Dragon.findByIdAndRemove(req.params.id).exec(function(err, dragon) {
      if(err) {
        console.log("Error in deleting dragon:", err);
        res.json(err);
      }
      if(!dragon) {
        res.json(`${dragon} not found.`);
      }
      else {
        res.redirect("/");
      }
    }); // end dragon id query

  },

}
