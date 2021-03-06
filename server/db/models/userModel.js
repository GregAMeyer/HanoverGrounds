var mongoose = require("mongoose");
var crypto = require('crypto')
var cartSchema = new mongoose.Schema({
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        })

var userSchema = new mongoose.Schema({
	password: {
		type: String
        //required: true
	},
	email: {
		type: String
        //required: true
	},
	cart: {
        type: [cartSchema]
        // ref: "Cart"
    },
	isSeller: {
		type: Boolean,
		default: false
	},
    isSuperUser: {
        type: Boolean,
        default: false
    },
    company: {
        type: String
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
    productsForSale: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
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
        id: String,
    },
    orderHistory: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Order'
    }
})

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
//are all used for local authentication security.
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
mongoose.model('Cart', cartSchema);
mongoose.model('User', userSchema);