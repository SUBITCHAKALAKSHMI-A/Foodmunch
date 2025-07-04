const mongoose = require('mongoose');

const GroupOrderSchema = new mongoose.Schema({
  groupId: { type: String, unique: true, required: true },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  items: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    dish: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Dish', 
      required: true 
    },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('GroupOrder', GroupOrderSchema);