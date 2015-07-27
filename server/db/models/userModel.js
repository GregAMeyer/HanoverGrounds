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

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};
var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }
    next();
});
userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;
userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

module.exports = {
		User: mongoose.model('User', userSchema)
}