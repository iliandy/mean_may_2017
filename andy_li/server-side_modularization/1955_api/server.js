var express = require("express");
var bp = require("body-parser");
var mongoose = require("mongoose");
var app = express();

app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/client/static"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bp.json());

app.set("views", __dirname + "/client/views");
app.set("view engine", "ejs");

// connect to db
require("./server/config/mongoose");
// set up routes
require("./server/config/routes")(app);


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
