var mongoose = require('mongoose');

var product = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	company: {
		type: String
	},
	description: {
		type: String,
		//required: true
	},
	photo: {
		type: String,
	},

	rating: {
		type: Number,
		min: 1,
		max: 5
	},

	category: {
		type: String,
		//required: true
	},

	roast: {
		type: String
	},

	region: {
		type: String
	},
	price: {
		type: Number
	}


})


mongoose.model('Product', product);