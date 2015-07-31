var mongoose = require('mongoose');

var product = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "User"
	},
	description: {
		type: String,
		//required: true
	},
	photo: {
		type: [String],
	},
	quantity: {
		type: Number,
		//default: 1
	},
	price: {
		type: Number
	},
	categories: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categories'
	}
})


mongoose.model('Product', product);

//photo must be an array or strings
//in the back-end when a photo is added to a product,
//the photo's name will be normalized to photo-1, based on length of photo array

//category must be an array of strings
