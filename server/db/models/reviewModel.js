var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	},
	rating: {
		type: Number,
		min: 1,
		max: 5
	},
	review: String,
	user: String

})


mongoose.model('Reviews', reviewSchema);