var fs = require('fs');
var http = require("http");
var path = require("path");

module.exports = function(request, response){
  console.log('Request', request.url);

  var filePath = "." + request.url;
  if (filePath == "./") {
    filePath = "./views/index.html";
  }
  else if(request.url.indexOf('.') == -1){
    // filepath = "./views" + request.url + '.html';
    filePath = `./views${request.url}.html`
  }

  var extname = path.extname(filePath);
  var contentType;

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".jpg" || ".jpeg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    default:
      contentType = "text/html";
  }

  if (path.dirname(filePath) == "./img"){
    fs.readFile(filePath, function(errors, contents){
      response.writeHead(200, {'Content-Type': contentType});
      response.write(contents);
      response.end();
    });
  }
  else {
    fs.readFile(filePath, 'utf8', function(errors, contents){
      if (errors) {
        response.end('URL requested unavailable...');
      }
      else {
        response.writeHead(200, {'Content-Type': contentType});
        response.write(contents);
        response.end();
      }
    });
  }
}
