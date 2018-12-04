var http = require('http'); // Http Mode IMP!!
var dt = require('./myfirstmodule'); // Date module imported from other file(from npm install)
var uc = require('upper-case'); // UpperCase Node Module (from npm install)
var fs = require('fs'); // File System Module
var formidable = require('formidable'); //The Formidable Module for File Uploads (from npm install)
var url = require('url'); // URL Module for URL manipulations from ClientSide
var events = require('events'); // Events Module


// File System Module Implementation
var readStream = fs.createReadStream('./demoText.txt');
/*Write to the console when the file is opened:*/
readStream.on('open', function () {
  console.log('The file is open');
});

//Http Mode Implementation: creating a server object @8080 port:
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});//If the response from the HTTP server is supposed to be displayed as HTML,
    // you should include an HTTP header with the correct content type:
    res.write("The date and time are currently: " + dt.myDateTime());//write a response to the client
    res.write(uc('Hello World!'));//write a response to the client
    res.end();//end the response
}).listen(8080);//the server object listens on port 8080

//The function passed into the http.createServer() method,
// will be executed when someone tries to access the computer on port 8080

//Events Module Implementation:
//Node.js has a built-in module, called "Events",
// where you can create-, fire-, and listen for- your own events.

var eventEmitter = new events.EventEmitter();
    //STEP 1:Create an event handler:
    var myEventHandler = function () {
        console.log('I hear a scream!');
    }
    //STEP 2:Assign the event handler to an event:
    eventEmitter.on('scream', myEventHandler);

    //STEP 3:Fire the 'scream' event:
    eventEmitter.emit('scream');

//The Formidable Module Implementation: for file uploads: IMPORTANT!!

    //Step 1: Create an Upload Form : Creating @ 8081

        http.createServer(function (req, res) {if (req.url == '/fileupload') {
    //Step 2: Parse the Uploaded File
    //When the file is uploaded and parsed, it gets placed on a temporary folder on your computer.
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var oldpath = files.filetoupload.path;
                var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
                fs.rename(oldpath, newpath, function (err) {
                  if (err) throw err;
                  res.write('File uploaded and moved!');
                  res.end();
                });
            });
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();
          }
        }).listen(8081);