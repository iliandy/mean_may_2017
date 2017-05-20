var mongoose = require("mongoose");
var fs = require("fs");

mongoose.connect("mongodb://localhost/friends_api");
mongoose.Promise = global.Promise;

var models_path = __dirname + "/../models";
// for loop to load in each model file
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf(".js") != -1) {
    console.log(`Loading ${file}...`);
    require(`${models_path}/${file}`);
  }
});
