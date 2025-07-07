const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
  quantity: { 
    type: Number, 
    default: 1,
    min: 1
  }
}, { _id: false });

const GroupOrderSchema = new mongoose.Schema({
  groupId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  splitMethod: {
    type: String,
    enum: ['equal', 'individual'],
    default: 'equal'
  },
  items: [itemSchema]
}, { timestamps: true });

module.exports = mongoose.model('GroupOrder', GroupOrderSchema);