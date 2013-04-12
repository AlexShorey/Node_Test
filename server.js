var http = require("http");
var url = require("url");
var fs = require("fs");
var socketIO = require("socket.io");

var httpServer;

var clients = [];
var chatLog = [];

function start(){
	function onRequest(req, res){
		var urlString = url.parse(req.url).pathname;
		console.log("URL requested: " + urlString);

		//res.writeHead(200, {"Content-Type": "text/html"});
		//fs.readFile("./index.html", function(error, content){

		if(urlString == "/"){
			fs.readFile("index.html", function(error, content){
				if(error){
					res.writeHead(500);
					res.end();
				}
				else{
					res.write(content);
					res.end();
				}
			});
		}
		else {
			fs.readFile("./" + urlString, function(error, content){
				console.log("reading: " + urlString);

				if(error) {
					console.log("################################" + error)
					res.writeHead(500);
					res.end();
				}
				else {
					res.write(content);
					res.end();
				}
			});	
		}
	}
	httpServer = http.createServer(onRequest).listen(1337);
	console.log("server started");
}

function startChat(){
	function onConnect(socket){

	}

	var io = socketIO.listen(httpServer);

	io.sockets.on('connection', function(socket){
		socket.emit("initSockets", {hello: "world"});
		socket.on("buttonClick", function(data){
			console.log("button data: " + data.buttonDat);
			socket.emit("message", {message: "something"});
		});
		socket.on("message", function(data){
			console.log("chat message: " + data);
		});
	});
}

function handleMessage(msg){

}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

exports.start = start;
exports.startChat = startChat;