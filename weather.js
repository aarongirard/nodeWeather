var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");
var request = require("request");

function Weather(city){
	//create event instance
	EventEmitter.call(this);

    profileEmitter = this;

    request('http://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial', function(error, response, body) {
	//console.log("Body: "+ body);
	//console.log("Response: "+response);
	//console.log(error);
	

    var weather = (JSON.parse(body));
	//console.log(mainS.main.temp);

	//console.log('------FROM WEAHTER.JS----------');
	//console.log(weather.main.temp);
	 profileEmitter.emit("end", weather);
    });
}

function weather5(city){
    EventEmitter.call(this);

    profileEmitter = this;

    var weather;
    request('http://api.openweathermap.org/data/2.5/forecast?q=' + city +'&units=imperial', function(error, response, body) {
        //console.log("Body: "+ body);
        //console.log("Response: "+response);
        //console.log(error);

        if(error === null || response.statusCode !== 200){ 
            profileEmitter.emit("error", error); 
        }

        weather = (JSON.parse(body));
        
        
        var relevantInfo = [];

        //get releveant information for a single dt
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
            
            ;add that relevenat info to object
            relevantInfo.push(newWeather);  
        }   

        for(var i = 0; i < relevantInfo.length; i++)
        {
            for(var key in relevantInfo[i])
            {
                console.log(key + ': ' + relevantInfo[i][key]);
            }
        }

        profileEmitter.emit("end", weather);
    });
}

util.inherits( Weather, EventEmitter );

module.exports = Weather;