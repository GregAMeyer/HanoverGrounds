var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	user_name: {
		type: String,
	},
	password: {
		type: String,
	},
	email: {
		type: String
	},
	cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
        //type: String
    },
	isAdmin: {
		type: Boolean,
		default: false
	},
    productsForSale: {
        //in dashboard, this is the array we need to edit
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
        //type: String
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
// var generateSalt = function () {
//     return crypto.randomBytes(16).toString('base64');
// };
// var encryptPassword = function (plainText, salt) {
//     var hash = crypto.createHash('sha1');
//     hash.update(plainText);
//     hash.update(salt);
//     return hash.digest('hex');
// };
// userSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//         this.salt = this.constructor.generateSalt();
//         this.password = this.constructor.encryptPassword(this.password, this.salt);
//     }
//     next();
// });
// userSchema.statics.generateSalt = generateSalt;
// userSchema.statics.encryptPassword = encryptPassword;
// userSchema.method('correctPassword', function (candidatePassword) {
//     return encryptPassword(candidatePassword, this.salt) === this.password;
// });

mongoose.model('User', userSchema);