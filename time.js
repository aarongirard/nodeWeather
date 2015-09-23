var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");
var request = require("request");



	var weather;
	var city  = 'Atlanta';
	request('http://api.openweathermap.org/data/2.5/forecast?q=' + city +'&units=imperial', function(error, response, body) {
		//console.log("Body: "+ body);
		//console.log("Response: "+response);
		//console.log(error);
		weather = (JSON.parse(body));
		//console.log(weather);
		
		var relevantInfo = [];

		for (var i = 0; i < weather.list.length; i++) 
		{	
			var newWeather={
				dt: '',
				temp: '',
				humidity:'' , 
				description: '' 
			};
			
			newWeather.dt = weather.list[i]['dt'];
			newWeather.temp = weather.list[i]['main']['temp'];
			newWeather.humidity = weather.list[i]['main']['humidity'];
			newWeather.description = weather.list[i]['weather'].pop().description;
			relevantInfo.push(newWeather);	
		}	

		for(var i = 0; i < relevantInfo.length; i++)
		{
			for(var key in relevantInfo[i])
			{
				console.log(key + ': ' + relevantInfo[i][key]);
			}
		}

		 //profileEmitter.emit("end", weather);
		 //profileEmitter.emit("error", error);
	});
	
	
	

/*
First unit of abstraction is going to be a day
-get all days that will be represented
	-what hours of these days do I want to show
	-00, 3,6,9,12,15,18,21

%3= 0, 1 ,2 
if 0, do nothing to date, if 1, then subtract 60*60 to each date, if 2 then add 60*60 to each value 
	
*/
//var values = [ 1442588400, 1442599200, 1442610000, 1442620800, 1442631600, 1442642400, 1442653200];

var convertTime = function(time){
	var date;
	var hour;
	
	//convert to ms time
	time = time * 1000;
	date = new Date(time);
	hour =  date.getHours();

	if (hour%3 === 0) {
	
	} else if (hour%3 === 1) {
		//subtract one hour
		hour--;
	} else {
		//time%3 === 2
		//add 1 hour
		hour++;
	}

	return hour;
}


/*

{
  "city": {
    "id": 4180439,
    "name": "Atlanta",
    "coord": {
      "lon": -84.387978,
      "lat": 33.749001
    },
    "country": "US",
    "population": 0,
    "sys": {
      "population": 0
    }
  },
  "cod": "200",
  "message": 0.004,
  "cnt": 40,
  "list": [
    {
      "dt": 1442588400,
      "main": {
        "temp": 297.96,
        "temp_min": 297.23,
        "temp_max": 297.96,
        "pressure": 997.47,
        "sea_level": 1030.02,
        "grnd_level": 997.47,
        "humidity": 67,
        "temp_kf": 0.73
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "sky is clear",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 2.76,
        "deg": 56.0005
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2015-09-18 15:00:00"
    }
    }
  ]
}*/