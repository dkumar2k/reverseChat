'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

/**
 * Chat Schema
 */
const ChatSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	facebook : {
		name: String,
		photo: String
	},
	chatCount: Number
}, {
  collection: 'chat'
});


module.exports = mongoose.model('Chat', ChatSchema);