const User = require('../models/user');

module.exports = function(server, sessionMiddleware) {
	// const io = require("socket.io")(server);
	const io = require("socket.io")(server)
	.use((socket, next)=>{
		// Wrap the express middleware
		sessionMiddleware(socket.request, {}, next);
	});

	//listen on every connection
	io.on("connection", (socket) => {
		console.log('New user connected');
		let userId = socket.request.session.passport.user;
		console.log("Socket UserId : ", userId);
		
		let name = "Anonymous";	//default username

		User.findOne({ "_id": userId }, function(err, user) {
			if (err){
				console.log("Socket connection DB User retrieval FAILED. Err: "+ JSON.stringify(err));
				return;
			}
			if (user) {
				name = user.facebook.name;
				//listen on new_message
				socket.on('new_message', (data) => {
					let message=data.message;
					//broadcast the new message
					io.emit('new_message', { message : message, photo:user.facebook.photo });
					io.emit('new_message', { message : reverseMessage(message), photo:'../image/robot.png' });
				});

				//listen on typing
				socket.on('typing', (data) => {
					socket.broadcast.emit('typing', {name : name});
				});
			}
		});
	});

};

// route middleware to ensure user is logged in
const reverseMessage = (message) => {
	let reverseMessage = "";
	if(message && message.length>0){
		let messageArray = message.split(" ");
		for(let i=messageArray.length-1; i>=0; i--){
			reverseMessage+=messageArray[i]+" ";
		}
	}
	return reverseMessage;
};
