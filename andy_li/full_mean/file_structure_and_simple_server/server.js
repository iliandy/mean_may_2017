var express = require("express");
var bp = require("body-parser");
var mongoose = require("mongoose");
var app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bp.json());

// connect to db
require("./server/config/mongoose");
// set up routes
require("./server/config/routes")(app);


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
