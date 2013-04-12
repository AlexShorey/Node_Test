var http = require("http");
var url = require("url");
var fs = require("fs");
var socketIO = require("socket.io");

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
	http.createServer(onRequest).listen(1337);
	console.log("server started");
}

function startChat(){

}

exports.start = start;
exports.startChat = startChat;