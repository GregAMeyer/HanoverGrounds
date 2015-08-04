var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: [{
                checkoutItem: mongoose.Schema.Types.ObjectId,
                name: String,
                unitPrice: Number,
                unitTotalPrice: Number,
                photo: String,
                quantity: {
                    type: Number,
                    default: 1
                }
        }],
        ref: 'Product'
    },
    status: String
})

orderSchema.virtual('grandTotal').get(function(){
    var total = 0;
    this.products.forEach(function(product){
        total = total + product.unitTotalPrice
    })
    return total
})

mongoose.model('Order', orderSchema);