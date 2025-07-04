const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: String,
    enum: ['starter', 'main', 'dessert', 'beverage'],
    required: true
  },
  description: {
    type: String,
    required: false
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
}, { timestamps: true });

module.exports = mongoose.model('Dish', DishSchema);