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

app.post('/quotes/create', function(req, res) {
  console.log("-= Reached /quotes/create (redirect to /quotes) =-");
  console.log("POST DATA", req.body);
  // create a new Quote with the name and quote corresponding to those from req.body
  var quote = new Quote({
    name: req.body.name,
    quote: req.body.quote,
  });
  // save new quote to db and run a callback function with an error (if any) from operation
  quote.save(function(err, quote) {
    // if there is an error, go back to / and display error msgs at bottom
    if(err) {
      console.log("Error in adding quote:", err);
      res.render("index.ejs", {errors: quote.errors});
    }
    else { // else console.log added quote and redirect to quotes route (/quotes)
      console.log("Quote added:", quote);
      res.redirect('/quotes');
    }
  });
});

app.get("/quotes", function(req, res) {
  console.log("-= Reached / (quotes.ejs) =-");


});


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
