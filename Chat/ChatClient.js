var socket = io.connect();

socket.on('connect', function() {
	socket.send("hi");
	socket.on("message", function(msg){
		console.log(msg);
	});
});

function Chat_onload(){
	// dont forget JSON objects
	//socket.emit('buttonClick', {buttonDat: 'some button data'});

	var chatInputDiv = document.createElement('div');
	chatInputDiv.id = "chatInputDiv";
	
	var chatInput = document.createElement('input');
	chatInput.id = "chatInput";
	chatInput.onkeypress = function(e, form) {
		handleChatKey(e, form);
	};
	
	document.body.appendChild(chatInputDiv);
	document.getElementById("chatInputDiv").appendChild(chatInput);
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

function handleChatKey(e, form){
	var key = e.keyCode || e.which;
	if(key == 13){
		console.log("enter hit");
		socket.emit("message", chatInput.value);
		chatInput.value = "";
	}
}