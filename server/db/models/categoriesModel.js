var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
	itemCategory: {
		type: String,
		//required: true
	},
	roast: {
		type: String
	},
	region: {
		type: String
	},
	machine:{
		type: String
	}
})


mongoose.model('Categories', categoriesSchema);