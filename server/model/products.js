var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    title: String,
    rate: [Number],
    description: String,
    price: String,
    brand: String,
    detailProduct: String,
    imageProduct: [String]
})

module.exports = mongoose.model('Product',productSchema);
