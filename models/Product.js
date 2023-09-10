import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  comment: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, required: true, default: false },
    banner: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
// module.exports = Product;
