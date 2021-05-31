const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	facebook: {
		type: String
	},
	google: {
		type: String
	},
	firstname: {
		type: String
	},
	lastName: {
		type: String
	},
	image: {
		image: String,
		default: String
	},
	email: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
