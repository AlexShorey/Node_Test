var http = require("http");
var url = require("url");
var fs = require("fs");

function start(){
	function onRequest(req, res){
		var urlString = url.parse(req.url).pathname;
		console.log("URL requested: " + urlString);
		
		//fs.readFile("./index.html", function(error, content){

		if(urlString == "/"){
			//res.writeHead(200, {"Content-Type": "text/html"});

			fs.readFile("index.html", function(error, content){
				if(error){
					res.writeHead(500);
					res.end();
				}
				else{
					res.write(content);
					res.end();
				}
			})
		}
		else{
			//res.writeHead(200, {"Content-Type": "text/html"});

			fs.readFile("./" + urlString, function(error, content){
				console.log("reading: " + urlString);

				if(error) {
					console.log("################################" + error)
					res.writeHead(500);
					res.end();
				}
				else {
					//res.writeHead(200, {'Content-Type': 'text/html'});

					res.write(content);
					res.end();
				}
			});	
		}
		
		//res.write("<img src='http://webcam001.snc.edu/axis-cgi/mjpg/video.cgi?resolution=640x480&amp;dummy=1365533886369' height='720' width='960' alt='Camera Image'>");
		//res.render("index.html")
		//res.end();
	}

	http.createServer(onRequest).listen(1337, "192.168.1.6");
	console.log("server started");
}

exports.start = start;