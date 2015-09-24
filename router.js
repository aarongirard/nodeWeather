var renderer = require("./renderer.js");
var Weather = require("./Weather.js");

//home route
function homeRoute(request, response)
{
	if(request.url === "/")
	{
		response.writeHead(200, {'Content-Type': 'text/html'});
		renderer.view("header", {}, response);
		renderer.view("home", {}, response);
		renderer.view("footer", {}, response);
		response.end();
	}
}

function weatherRoute(request, response)
{
	
	console.log(request.body);

	response.writeHead(200, {'Content-Type': 'text/html'});
	renderer.view("header", {}, response);

	//create event to get weather
	var weatherCity  = new Weather(request.body.city);

	//once event recieved info
	weatherCity.on("end", function(weatherValues){
		//store values from return json file
		
		var values = {
			'temperature':weatherValues.main.temp,
			'humidity':weatherValues.main.humidity + '%',
			'city': request.body.city
		}

		console.log('------');
		for(var key in values)
		{
			console.log(values[key]);
		}

		renderer.view("homeSearched", values, response);
		renderer.view("footer", {}, response);
		
		response.end();
	}).on("error", function(error){
		console.log("Heres Your Error:   " + error);	
	});
	
}

function weatherRoute5(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/html'});
	renderer.view("header", {}, response);

	//create event to get weather
	var weatherCity  = new Weather5Day(request.body.city);

	//once event recieved info
	weatherCity.on("end", function(weatherValues){
		renderer.view5Day("homeSearched5Day.html", weatherValues, response);
		renderer.view("footer", {}, response);

		response,end();
	}).on("error", function(error)){
		console.log("Heres Your Error:   " + error);
	});
}



module.exports.weather5 = weatherRoute5;
module.exports.weather = weatherRoute;
module.exports.home = homeRoute;
