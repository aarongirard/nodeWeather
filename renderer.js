var fs = require('fs');


//this will replacy every key in the html doc with the respective value form the api call
function insertValues(values, content){
 for(var key in values){
    
    content  = content.replace("{{"+ key +"}}", values[key]);
  }

  return content
}


function view(templateName, values, response){
  //read template files
  //blockimg because synchronous
  var fileContents = fs.readFileSync('./views/' + templateName+ '.html', {encoding: "utf8"});
 
  //Insert values in to the content
  fileContents = insertValues(values, fileContents);
  response.write(fileContents);
  console.log('read: ' + templateName);
}

module.exports.view = view;