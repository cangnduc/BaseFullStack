const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image: { type: String },
    countInStock: { type: Number },
    rating: { type: Number },
    numReviews: { type: Number },
    reviewsId: { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: null },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
