const Chat = require('../models/chat');

module.exports = function(app, passport) {

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		console.log('reached get / route');
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/chatroom', isLoggedIn, function(req, res) {
		console.log('User reached /chatroom');
		res.render('chatroom.ejs', {
			user : req.user
		});
	});
	
	app.get('/dashboard', isLoggedIn, function(req, res) {
		console.log('User reached /dashboard..');
		Chat.find({}, function(err, chats) {
			if (err){
				console.log("Chat DB retrieval FAILED. Err: "+ JSON.stringify(err));
				return;
			}
			res.render('dashboard.ejs', { 'dashboardRecords' : chats });
			// return chats;
		});
	});
	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		console.log('Going to initialize ChatCount--');
		Chat.findOneAndRemove({ "user": req.user._id }, function (err) {
			if (err){
				console.log('Chat count initialization persist failed--');
			}else{
				console.log('Chat count initialization persisted--');
			}
			return;
	 	});
	 	req.logout();
		res.redirect('/');
	});

	// FACEBOOK : send to facebook to do the authentication
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/chatroom',
			failureRedirect : '/'
		}));

// UNLINK ACCOUNTS: used to unlink accounts. for social accounts, just remove the token
// user account will stay active in case they want to reconnect in the future
	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
		var user			= req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/chatroom');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
