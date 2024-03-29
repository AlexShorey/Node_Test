//make this more modular

function Chat_onload(){
	var socket = io.connect();
	var chatObj = new ChatObj(socket);

	socket.on('connect', function() {

		socket.on("error", function(error){
			//chatObj.chatInput.value = "Bad Username";
			console.log("Received Error: " + error);
		})
		socket.on("chatPush", function(msg){
			console.log("############: " + msg);
			chatLog.innerHTML = msg;
		});
	});
};

function ChatObj(skt){

	var _this = this;
	this.socket_ref = skt;

	this.inputState = 0;


	this.chatLogDiv = document.createElement('div');
	this.chatLogDiv.id = "chatLogDiv";

	this.chatLog = document.createElement('p');
	this.chatLog.id = 'chatLog';

	this.chatInputDiv = document.createElement('div');
	this.chatInputDiv.id = "chatInputDiv";

	this.chatInput = document.createElement('input');
	this.chatInput.id = "chatInput";
	this.chatInput.value = "Enter Username";
	this.chatInput.onkeypress = function(e, form) {
		_this.handleChatKey(e, form);
	};

	this.chatInput.onfocus = function(e, form) {
		if(chatInput.value == "Enter Username" || chatInput.value == "Bad Username"){
			chatInput.value = "";
		}
	};

	document.body.appendChild(this.chatLogDiv);
	this.chatLogDiv.appendChild(this.chatLog);
	//this.chatLogDiv.appendChild(this.chatInputDiv);

	document.body.appendChild(this.chatInputDiv);
	this.chatInputDiv.appendChild(this.chatInput);

	//this.chatInputDiv.style.height = this.chatLogDiv.style.height = this.chatLogDiv.style.height;
	this.chatInputDiv.style.top = parseInt(window.getComputedStyle(this.chatLogDiv).getPropertyValue('top')) + 
								  parseInt(window.getComputedStyle(this.chatLogDiv).getPropertyValue('height')) + 3 + "px";

	this.chatInputDiv.style.left = parseInt(window.getComputedStyle(this.chatLogDiv).getPropertyValue('left')) + "px";

	console.log(window.getComputedStyle(this.chatLogDiv).getPropertyValue('top'));

	//this.chatInputDiv.style.top = (this.chatLogDiv.style.height + 290) + "px";

	ChatObj.prototype.handleChatKey = function(e, form) {
		this.key = e.keyCode || e.which;
		if(this.key == 13) {
			console.log('enter hit');
			if(this.inputState == 0){
				if(this.chatInput.value.length < 10) {
					this.socket_ref.emit('Username', this.chatInput.value);
					this.inputState = 1;
					this.chatInput.value = "";
				}
				else{
					this.chatInput.value = "Bad Username";
				}
			}
			else if(this.inputState == 1){
				this.socket_ref.emit('Message', this.chatInput.value);
				this.chatInput.value = "";
			}
			
			
		}
	};
	return ChatObj;
};


