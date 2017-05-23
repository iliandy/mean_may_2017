var express = require("express");
var bp = require("body-parser");
var app = express();
var portNum = 8000;

app.use(express.static(`${__dirname}/client`));
app.use(express.static(`${__dirname}/bower_components`));
app.use(bp.json());

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(portNum, function() {
  console.log(`Server running on port ${portNum}`);
});
