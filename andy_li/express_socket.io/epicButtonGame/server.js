var express = require("express");
var bp = require("body-parser");
var app = express();

app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/bower_components"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index.ejs");
});


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket) {
  console.log("Socket ID:", socket.id);

  var count = 0;
  socket.on("epic_press", function() {
    count++;
    console.log("Count:", count);
    io.emit("but_count", {count: count})
  });

  socket.on("reset_press", function() {
    count = 0;
    console.log("Count:", count);
    io.emit("but_count", {count: count})

  })
});
