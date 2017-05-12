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

app.post("/result", function(req, res) {
  console.log(req.body);
  res.render("result.ejs", req.body)
});


var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket) {
  console.log("Using sockets!");
  console.log("Socket ID:", socket.id);

  socket.on("posting_form", function(client_data) {
    console.log(client_data);
    socket.emit("updated_message", {response: client_data});
    var rand_num = Math.floor((Math.random() * 1000) + 1);
    socket.emit("random_number", {response: rand_num});
  });
});
