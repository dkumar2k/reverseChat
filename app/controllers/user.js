// let mongoose = require('mongoose');
// let	User = mongoose.model('User');

// // exports.getMe = function(req, res) {
// const getMe = (req, res) => {
// 	if(req.params.id==10){
// 		res.jsonp({name: "Sunny"});
// 		// res.render("user", {name: "Sunny"});
// 	} else {
// 		res.status(401).send({
// 			message: 'User not recognized'
// 		});
// 	}
// };
	

// const createMe = (req, res) => {
// 	let user = new User();
// 	console.dir(req.body);

// 	user.userName = req.body.userName;
// 	user.firstName = req.body.firstName;

// 	console.log('User->'+JSON.stringify(user));
// 	// Then save the user
// 	user.save(function(err) {
// 		if (err) {
// 			res.status(400).send({
// 				message: err
// 			});
// 		} else {
// 			res.status(200).send({
// 				message: 'User registration success'
// 			});
// 		}
// 	});
// };

// const getProfile = (req, res) => {
// 	res.render('profile.ejs', {
// 		user : req.user // get the user out of session and pass to template
// 	});
// };

// module.exports = {
// 	getMe : getMe,
// 	createMe : createMe
// };