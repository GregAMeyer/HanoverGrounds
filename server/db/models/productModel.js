var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	photo: {
		data: Buffer,
		contentType: String
	},

	rating: {
		type: Number,
		min: 1,
		max: 5
	},

	category: {
		type: String,
		required: true
	},

	roast: {
		type: String
	},

	region: {
		type: String
	}


})


mongoose.model('Product', schema);