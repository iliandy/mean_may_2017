var express = require("express");
var bp = require("body-parser");
var app = express();

app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.post("/result", function(req, res) {
  console.log(req.body);
  res.render("result.ejs", req.body)
});


app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
