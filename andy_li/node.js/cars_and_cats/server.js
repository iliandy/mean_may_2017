// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    switch (request.url) {
      case "/":
        fs.readFile('views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
        break;
      case "/cars":
        fs.readFile('views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
        break;
      case "/cats":
        fs.readFile('views/cats.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
        break;
      case "/cars/new":
        fs.readFile('views/new_car.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
        break;
      case "/css/style1.css":
        fs.readFile('css/style1.css', 'utf8', function(errors, contents){
          response.writeHead(200, {'Content-type': 'text/css'});
          response.write(contents);
          response.end();
        })
        break;
      case "/img/model3.jpg":
        fs.readFile("./img/model3.jpg", function(errors, contents){
          console.log('contents:', contents)
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        });
        break;
      case "/img/future.jpg":
        fs.readFile("./img/future.jpg", function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        });
        break;
      case "/img/white_cat.jpg":
        fs.readFile("./img/white_cat.jpg", function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        });
        break;
      case "/img/burrito_cat.jpg":
        fs.readFile("./img/burrito_cat.jpg", function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        });
        break;

      default:
        response.end('URL requested is unavailable...');
    }
});
// tell your server which port to run on
server.listen(7077);
// print to terminal window
console.log("Running in localhost at port 7077");
