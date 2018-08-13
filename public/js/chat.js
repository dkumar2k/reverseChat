
$(function(){
	//make connection
	const socket = io.connect('https://da06c5ef.ngrok.io');
	// const socket = io.connect('https://da06c5ef.ngrok.io', {'sync disconnect on unload': true });

	const message = $("#message");
	const name = $("#name").val();
	const send_message = $("#send_message");
	const chatTextArea = $("#chatTextArea");
	const feedback = $("#feedback");

	$("#message").keyup(function(event) {
	    if (event.keyCode === 13) {
	        $("#send_message").click();
	    }
	});
	//Emit message send event
	send_message.click(function(){
		if(message.val() && message.val().length>0){
			socket.emit('new_message', {message : message.val()});
			message.val('');
		}
	});

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		let elementString = 
			"<p class='message'>"	+
			"<img src='"+ data.photo +"' alt='Thumbnail'>"	+
			"<i>" + data.message + "</i>"	+
			"</p>";
		chatTextArea.append(elementString);
	});

	//Emit typing event
	message.bind("keypress", () => {
		socket.emit('typing');
	});

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html('');
		feedback.append("<p><i>" + data.name + " is typing a message..." + "</i></p>");
	});


});


