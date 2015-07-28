var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/HanoverGrounds');
// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

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
	},
	price: {
		type: Number
	}


})


mongoose.model('Product', product);