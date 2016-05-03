var express = require('express'), 
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

    var port = process.env.PORT || 8080;

 var color;

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(port);
// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");


// event-handler for new incoming connections
io.on('connection', function (socket) {

   // add handler for message type "changecolor".
   socket.on('newcolor', function (data) {

      // add received line to history 
      color = data;

      // send line to all clients
      io.emit('changecolor', color);
   });


   // add handler for message type "changecolor".
   socket.on('mousetype', function (data) {

      // send line to all clients
      io.emit('logmouse', data);
   });
});