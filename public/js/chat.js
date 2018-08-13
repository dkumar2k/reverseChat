
$(function(){
	$("#dashboardContainer").hide();

	//make connection
	const socket = io.connect('https://4bf55bec.ngrok.io', {'sync disconnect on unload': true });

	const message = $("#message");
	const name = $("#name").val();
	const send_message = $("#send_message");
	const chatTextArea = $("#chatTextArea");
	const feedback = $("#feedback");
	const chatroom=document.getElementById("chatroom");

	message.keyup(function(event) {
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

		chatroom.scrollTop = chatroom.scrollHeight;
	});

	//Emit typing event
	message.bind("keypress", () => {
		socket.emit('typing');
	});

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html('');
		feedback.append("<p><i>" + data.name + " is typing a message..." + "</i></p>");
		chatroom.scrollTop = chatroom.scrollHeight;
	});
	//Listen on disconnect
	socket.on('user_disconnected', (data) => {
		feedback.html('');
		feedback.append("<p><i>" + data.name + " has disconnected..." + "</i></p>");
		chatroom.scrollTop = chatroom.scrollHeight;
	});

	$("#dashboardAnchor").click(function(){
		$("#chatroomContainer").hide();
		$("#dashboardContainer").show();
		$("#dashboardTable").html('');
		let row1= 
			"<tr><td align='center'><strong>User</strong></td>"	+
			"<td><strong>Message Count</strong></td></tr>";
		
		
		$.ajax({url: "/dashboard", success: function(dashboardRecords){
			$('#dashboardTable').html(row1);
			if(dashboardRecords){
				dashboardRecords.forEach(function(record){
					let row= 
						"<tr>"	+
						"<td><p class='message'>"	+
						"<img src='"+record.facebook.photo+"' alt='Thumbnail'>"	+
						"<i>" +record.facebook.name + "</i>"	+
						"</p></td>"+
						"<td align='center'>"+ record.chatCount + "</td>"	+
						"</tr>";
					
					$('#dashboardTable tr:last').after(row);
				});
			}
		}});
	});
	$("#chatroomAnchor").click(function(){
		$("#dashboardContainer").hide();
		$("#chatroomContainer").show();
	});
});


