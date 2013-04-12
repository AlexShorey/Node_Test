var socket = io.connect();

socket.on('connect', function() {
	socket.send("hi");
	socket.on("message", function(msg){
		console.log(msg);
	});
});

function Chat_onload(){
	var btn = document.createElement('button');
	btn.id  = "socketBtn";
	btn.innerHTML = "clickMe";
	
	
	var chatInput = document.createElement('input');
	chatInput.id = "chatInput";

	btn.onclick = function() {
		socket.emit('buttonClick', {buttonDat: 'some button data'});
		socket.emit("message", chatInput.value);
		chatInput.value = "";
		console.log("button clicked");
	};

	document.body.appendChild(btn);
	document.body.appendChild(chatInput);
};

function handleInput(message){
	console.log("message: " + message);

	switch(message){
		case "Username":
			//log username
			break;
		case "Message":
			//log message
			break;
		default: console.log("Message Unhandled: " + message);
	}
}