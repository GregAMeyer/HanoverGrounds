var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/HanoverGrounds');


mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var userSchema = new mongoose.Schema({
	user_name: {
		type: String,
		required: true
	},
	password: {
		type: string,
		required: true
	},
	email: {
		type: String
	},
	cart: [Schema.Types.ObjectId],
	isAdmin: {
		type: Boolean,
		default: false
	},
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
})

module.exports = {
		User: mongoose.model('User', userSchema)
}