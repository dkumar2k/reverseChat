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
		console.log('User reached /dashboard');
		res.render('dashboard.ejs', {
			'dashboardRecords' : [
				{name:'Sunny Mishra', photo:'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=298312590921688&height=50&width=50&ext=1536679271&hash=AeQGKpIVwi2iuN4I' ,
				messageCount:21},
				{name:'Robot', photo:'../image/robot.png',messageCount:19},
				{name:'Funny Mishra', photo:'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=298312590921688&height=50&width=50&ext=1536679271&hash=AeQGKpIVwi2iuN4I',
				messageCount:10}
			]
		});
	});
	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
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
