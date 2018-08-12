'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

/**
 * User Schema
 */
const UserSchema = new Schema({
	facebook : {
		id: String,
		token: String, 		// we will save the token that facebook provides to the user					
		name: String,		// look at the passport user profile to see how names are returned
		email: String
	},
	isActive:{
		type:Boolean,
		default: true
	}
}, {
  collection: 'users'
});


module.exports = mongoose.model('User', UserSchema);