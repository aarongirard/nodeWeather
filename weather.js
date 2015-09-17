var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");
var request = require("request");

function Weather(city){
	//create event instance
	EventEmitter.call(this);

    profileEmitter = this;

    request('http://api.openweathermap.org/data/2.5/weather?q=' + city, function(error, response, body) {
	//console.log("Body: "+ body);
	//console.log("Response: "+response);
	//console.log(error);
	weather = (JSON.parse(body));
	//console.log(mainS.main.temp);

	//console.log('------FROM WEAHTER.JS----------');
	//console.log(weather.main.temp);
	 profileEmitter.emit("end", weather);
	 profileEmitter.emit("error", error);
});



    //hold incoming information
    /*var body;
    console.log('s');
    var request = http.get("http://api.openweathermap.org/data/2.5/weather?q="+city, function(response){
    	
    	//error
    	if (response.statusCode !== 200) {
    		
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the weather for " + city + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }
    
        //Read the data
        response.on('data', function (chunk) {
            console.log("data");
            body += chunk;
            //console.log(chunk);
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
        	console.log("END");
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    console.log(body);
                    var weather = JSON.parse(body);
                    console.log("wealdsf: "+weather);
                    profileEmitter.emit("end", weather);
                } catch (error) {
                	console.log("wealdsf: ");
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
		console.log(response.statusCode + "   got status code");
    }).on('error',function(e){"got an error: " + e });*/
}

util.inherits( Weather, EventEmitter );

module.exports = Weather;