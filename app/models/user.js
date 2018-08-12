'use strict';

/**
 * Module dependencies.
 */
let mongoose = require('mongoose');
let	Schema = mongoose.Schema;
	// crypto = require('crypto');
// require('mongoose-double')(mongoose);
let SchemaTypes = mongoose.Schema.Types;

/**
 * Employee Schema
 */
var UserSchema = new Schema({
	// userName: {
	// 	type: String,
	// 	trim: true,
	// 	unique:true
	// },
	// firstName: {
	// 	type: String,
	// 	trim: true
	// },
	facebook : {
		id: { type: String },
		token: { type: String }, 		// we will save the token that facebook provides to the user					
		name: { type: String },		// look at the passport user profile to see how names are returned
		email: { type: String }
	},
	isActive:{
		type:Boolean,
		default: true
	}
});


// UserSchema.statics.findUniqueUsername = function(name, suffix, callback) {
// 	var _this = this;
// 	var possibleUsername = username + (suffix || '');

// 	_this.findOne({
// 		username: possibleUsername
// 	}, function(err, user) {
// 		if (!err) {
// 			if (!user) {
// 				callback(possibleUsername);
// 			} else {
// 				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
// 			}
// 		} else {
// 			callback(null);
// 		}
// 	});
// };
// UserSchema.virtual('profile.contacts.mobile.fullMobileNo')
// 	.get(function() {
// 		return this.profile.contacts.mobile.mCountryCode + '-' + this.profile.contacts.mobile.mNumber;
// 	})
// 	.set(function(fullMobileNo) {
// 		var mobileParts = fullMobileNo.split('-');
// 		this.profile.contacts.mobile.mCountryCode = mobileParts[0];
// 		if(!mobileParts[1])
// 			throw new Error('Invalid mobile number format');
// 		this.profile.contacts.mobile.mNumber = mobileParts[1];
// });
// var validateLocalStrategyPassword = function(password) {
// 	return (this.profile.provider == 'local' && (password && password.length >= 6));
// };

mongoose.model('User', UserSchema);