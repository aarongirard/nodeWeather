var http = require('http');
var router = require("./router.js");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/*// parse application/json
app.use(bodyParser.json())*/


/*http.createServer(function (request, response){
	router.home(request, response);
	router.weather(request, response);
}).listen(8080, '127.0.0.1');*/

app.get('/', function(request, response){
	router.home(request, response);
	//router.weather(request, response);
});

app.post('/weatherSearch', router.weather);

var server = app.listen(8080, function(){
	var host = server.address().host;
	var port = server.address().port;
});


var bodyParser = require('body-parser')
var app = express()



