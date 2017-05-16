var mongoose = require("mongoose");
var fs = require("fs");

mongoose.connect("mongodb://localhost/1955_api");
mongoose.Promise = global.Promise;

var models_path = __dirname + "/../models";
// for loop to pull in each model file
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf(".js") >= 0) {
    console.log(`loading ${file}...`);
    require(`${models_path}/${file}`);
  }
});
