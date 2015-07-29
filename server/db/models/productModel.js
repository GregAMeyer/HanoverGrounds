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
	quantity: {
		type: Number,
		//default: 1
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
	},
	reviews: [{
		userId: Number,
		review: String
	}]
})


mongoose.model('Product', product);

//photo must be an array or strings
//in the back-end when a photo is added to a product,
//the photo's name will be normalized to photo-1, based on length of photo array

//category must be an array of strings