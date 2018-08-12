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
					//broadcast the new message
					io.emit('new_message', { message : data.message, name : name, photo:user.facebook.photo });
					// io.sockets.emit('new_message', {message : data.message, name : socket.name});
					// socket.broadcast.emit('new_message', {message : data.message, name : socket.name});
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
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
