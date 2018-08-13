const User = require('../models/user');
const Chat = require('../models/chat');

module.exports = function(server, sessionMiddleware) {
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

					handleChatCount(user);
				});

				//listen on typing
				socket.on('typing', (data) => {
					socket.broadcast.emit('typing', {name : name});
				});
				socket.on('disconnect', function () {
					console.log("---Socket Disconnected for "+user.facebook.name);
					io.emit('user_disconnected', { name : user.facebook.name });
					Chat.findOneAndRemove({ "user": userId }, function (err) {
						if (err){
							console.log('Chat count initialization persist failed--');
						}else{
							console.log('Chat count initialization persisted--');
						}
						return;
				 	});
				});
				
			}
		});
		
	});
	
};

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

const handleChatCount = (user)=> {
	console.log('Going to persist ChatCount..');
	Chat.findOne({ "user": user._id }, function(err, chat) {
		if (err){
			console.log("Socket connection DB User retrieval FAILED. Err: "+ JSON.stringify(err));
			return;
		}
		if (chat) {
			console.log('Going to increment ChatCount--');
			Chat.update({ "user": user._id }, { $inc: { chatCount: 1}} , function(err){
				if (err){
					console.log('Chat count increment persist failed--');
				}else{
					console.log('Chat count increment persisted--');
				}
				return;
		 	});
		}else{
			console.log('Going to persist ChatCount firsttime..');
			let newChat = new Chat();
			newChat.user = user._id;
			newChat.facebook.name  = user.facebook.name;
			newChat.facebook.photo = user.facebook.photo;
			newChat.chatCount = 1;

			newChat.save(function(err) {
				if (err){
					console.log('Chat persist failed--');
				}else{
					console.log('Chat persisted');
				}
				return;
			});
		}
	});
	
};
