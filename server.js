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
	httpServer = http.createServer(onRequest).listen(process.env.VCAP_APP_PORT || 80);
	console.log("server started");
}


//socket.emit("message", {message: "something"});

function startChat(){

	//var logToPush = "";

	var io = socketIO.listen(httpServer);


	io.sockets.on('connection', function(socket){
		
		socket.join("onlyRoom", function(data){
			pushChatLog(socket, data);
		});

		//socket.emit("chatPush", logToPush);

		socket.on("Username", function(data){
			console.log("Registering Username to " + socket.id + ": " + data);
			clients.push({id: socket.id, Username: data});
		});

		socket.on("Message", function(data){
			handleMessage(socket, data);
		});
	});

	function handleMessage(socket, data){
		for(i = 0; i < clients.length; i++){
			if(clients[i].id === socket.id && data.length < 400){

				chatLog.push({logEntry: "<span style='color: rgba(255,255,255,0.5);"  + 
													 'font-size: 16px;' +
													 "font-weight: bold'>" + 
										clients[i].Username + ": " + 
										"</span>" + data + "<br>"});

				console.log("Entry: " + chatLog[chatLog.length-1].logEntry);
				
				logToPush = "";
				for(i = 0; i < chatLog.length; i++){
					logToPush += chatLog[i].logEntry;
				}
				io.sockets.in("onlyRoom").emit("chatPush", logToPush);

				if(chatLog.length > 15){
					chatLog.shift();
				}
			}
		}
	}

	function pushChatLog(socket, data) {
		logToPush = "";
		//for
	}
}

function pushChat(data) {

}

function handleMessage(msg){

}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

exports.start = start;
exports.startChat = startChat;