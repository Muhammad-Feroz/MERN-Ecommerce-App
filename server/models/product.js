const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [5, 'Product name cannot exceed 5 characters'],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      type: String,
      required: [true, 'Please enter product image']
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'tees',
        'crewnecks',
        'sweatshirts',
        'hoodies',
        'pants & shorts',
      ],
      message: 'Please select correct category for product'
    }
  },
  colors: [
    {
      type: String,
      required: [true, 'Please select color for this product']
    }
  ],
  stocks: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [5, 'Product name cannot exceed 5 characters'],
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
