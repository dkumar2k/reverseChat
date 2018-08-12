
module.exports = function(server) {
	const io = require("socket.io")(server);

	//listen on every connection
	io.on('connection', (socket) => {
		console.log('New user connected');

		//default username
		socket.name = "Anonymous";

	    //listen on new_message
	    socket.on('new_message', (data) => {
	        //broadcast the new message
	        io.sockets.emit('new_message', {message : data.message, name : socket.name});
	    });

	    //listen on typing
	    socket.on('typing', (data) => {
	    	socket.broadcast.emit('typing', {name : socket.name});
	    });
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
