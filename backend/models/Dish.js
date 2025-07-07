const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  numericId: {
    type: Number,
    unique: true,
    required: true
  },
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
  },
  // Additional fields from your frontend data
  isSpicy: Boolean,
  isGluten: Boolean,
  isVegan: Boolean,
  isChefsSpecial: Boolean,
  tags: [String]
}, { timestamps: true });

// Auto-increment numericId
DishSchema.pre('save', async function(next) {
  if (this.isNew) {
    const highestDish = await this.constructor.findOne().sort('-numericId');
    this.numericId = highestDish ? highestDish.numericId + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Dish', DishSchema);