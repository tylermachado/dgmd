var http = require("http");

var server = http.createServer(function(request, response) {});
server.listen(1234, function() {
    console.log((new Date()) + ' Server is listening on port 1234');
});

var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request){
	var connection = request.accept();
	connection.sendUTF(new Date());
});