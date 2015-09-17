var renderer = require("./renderer.js");
var Weather = require("./Weather.js");

//home route
function homeRoute(request, response)
{
	if(request.url === "/")
	{
		var city = 'Atlanta';
		console.log('request received');
		response.writeHead(200, {'Content-Type': 'text/html'});
		renderer.view("header", {}, response);
		renderer.view("home", {}, response);
		renderer.view("footer", {}, response);
	}
}

function weatherRoute(request, response)
{
	console.log(request.body);
	/*var city  = request.body;
	console.log(city);
	response.end();*/

	response.writeHead(200, {'Content-Type': 'text/html'});
	renderer.view("header", {}, response);

	//create event to get weather
	var weatherCity  = new Weather(request.body.city);

	//once event recieved info
	weatherCity.on("end", function(weatherValues){
		//store values from return json file
		var temperature = convertTemperature(weatherValues.main.temp);
		var values = {
			'temperature':temperature,
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
		console.log("HeresYOURERROR:   " + error);	
	});
	
}

var convertTemperature = function(temperature){
	tempNum = parseInt(temperature);
	tempNum = (tempNum - 273.15) * 1.8 + 32.0;
	tempNum = parseInt(tempNum); //get rid of decimal point
	return tempNum + ' degrees ';
}

  
module.exports.weather = weatherRoute;
module.exports.home = homeRoute;

/*
		
		/
*/