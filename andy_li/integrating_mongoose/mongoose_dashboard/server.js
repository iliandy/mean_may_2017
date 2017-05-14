var express = require("express");
var bp = require("body-parser");
var mongoose = require("mongoose");
var app = express();

app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/bower_components"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/mongoose_dashboard");
// Use native promises
mongoose.Promise = global.Promise;

var DragonSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 2},
 owner: {type: String, required: true, minlength: 2},
}, {timestamps: true});

mongoose.model('Dragon', DragonSchema);
var Dragon = mongoose.model('Dragon');

// routes
app.get("/", function(req, res) {
  console.log("-= Reached / (index.ejs) =-");
  Dragon.find({}).exec(function(err, dragons) {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else {
      console.log(dragons);
      res.render("index.ejs", {dragons: dragons});
    }
  });
});

app.get("/dragons/new", function(req, res) {
  console.log("-= Reached /dragons/new (new_dragon.ejs) =-");
  res.render("new_dragon.ejs");
});

app.post("/dragons", function(req, res) {
  console.log("-= Reached /dragons (redirect to /) =-");
  console.log("POST data:", req.body);

  var dragon = new Dragon({
    name: req.body.name,
    owner: req.body.owner,
  });

  dragon.save(function(err, dragon) {
    if(err) {
      console.log("Error in adding dragon:", err);
      res.send(err);
    }
    else { // else console.log added dragon and redirect to dragons route (/dragons)
      console.log("Dragon added:", dragon);
      res.redirect('/');
    }
  });
});

app.get("/dragons/:id", function(req, res) {
  console.log("-= Reached /dragons/id (dragon.ejs) =-");
  Dragon.findById(req.params.id).exec(function(err, dragon) {
    if(err) {
      console.log("Error in displaying dragon:", err);
      res.send(err);
    }
    if(!dragon){
      res.send(`${dragon} not found.`)
    }
    else {
      console.log("Dragon displayed:", dragon);
      res.render("dragon.ejs", {dragon: dragon});
    }

  });
});

app.get("/dragons/edit/:id", function(req, res) {
  console.log("-= Reached /dragons/edit/id (edit_dragon.ejs) =-");
  Dragon.findById(req.params.id).exec(function(err, dragon) {
    if(err) {
      console.log("Error in displaying dragon:", err);
      res.send(err);
    }
    if(!dragon){
      res.send(`${dragon} not found.`)
    }
    else {
      console.log("Dragon displayed:", dragon);
      res.render("edit_dragon.ejs", {dragon: dragon});
    }

  });
});

app.post("/dragons/:id", function(req, res) {
  console.log("-= Reached /dragons/id (post) (redirect to /dragons/id (get)) =-");
  Dragon.findById(req.params.id).exec(function(err, dragon) {
    if(err) {
      console.log("Error in editing dragon:", err);
      res.send(err);
    }
    if(!dragon) {
      res.send(`${dragon} not found.`);
    }
    else {
      // edit specific dragon with form data
      dragon.name = req.body.name;
      dragon.owner = req.body.owner;
      dragon.save(function(err, dragon) {
        if(err){
          res.send(err);
        }
        else {
          console.log("Dragon after edit:", dragon);
          res.redirect(`/dragons/${req.params.id}`);
        }
      }); // end dragon edit save
    }
  }); // end dragon id query

});

app.post("/dragons/destroy/:id", function(req, res) {
  console.log("-= Reached /dragons/destroy/id (redirect to /) =-");
  Dragon.findByIdAndRemove(req.params.id).exec(function(err, dragon) {
    if(err) {
      console.log("Error in deleting dragon:", err);
      res.send(err);
    }
    if(!dragon) {
      res.send(`${dragon} not found.`);
    }
    else {
      res.redirect("/");
    }
  }); // end dragon id query

});


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
