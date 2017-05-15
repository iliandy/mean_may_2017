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

mongoose.connect("mongodb://localhost/quoting_dojo_redux");
// Use native promises
mongoose.Promise = global.Promise;

var QuoteSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 2},
 quote: {type: String, required: true, minlength: 1},
}, {timestamps: true});

mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote');  // We are retrieving this Schema from our Models, named 'User'



// routes
app.get("/", function(req, res) {
  console.log("-= Reached / (index.ejs) =-");
  res.render("index.ejs");
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
      res.send(err);
      console.log(err);
    }
    else { // else console.log added quote and redirect to quotes route (/quotes)
      console.log("Quote added:", quote);
      res.redirect('/quotes');
    }
  });
});

app.get("/quotes", function(req, res) {
  console.log("-= Reached / (quotes.ejs) =-");
  Quote.find({}).sort({createdAt: "desc"}).exec(function(err, quotes) {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else {
      console.log(quotes);
      res.render("quotes.ejs", {quotes: quotes});
    }
  });

});


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
