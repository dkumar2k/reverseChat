
$(function(){
	//make connection
	const socket = io.connect('https://4dd5514b.ngrok.io');

	const message = $("#message");
	const name = $("#name").val();
	const send_message = $("#send_message");
	const chatTextArea = $("#chatTextArea");
	const feedback = $("#feedback");

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()});
	});

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatTextArea.append("<p class='message'>" + data.name + ": " + data.message + "</p>");
	});

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing');
	});

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html('');
		feedback.append("<p><i>" + data.name + " is typing a message..." + "</i></p>");
	});



	
	//Emit a name
	// send_username.click(function(){
	// 	socket.emit('change_username', {username : username.val()});
	// });

});


