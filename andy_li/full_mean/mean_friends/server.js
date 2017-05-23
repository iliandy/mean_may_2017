var express = require("express");
var bp = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var port = 8000;

// static paths to files
app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/bower_components"));
// create json files from body-parser objects
app.use(bp.json());

// connect to db
require("./server/config/mongoose.js");
// set up routes
require("./server/config/routes.js")(app);

// run app and listen on port 8000
var server = app.listen(port, function() {
  console.log(`Server running on port ${port}...`);
});
