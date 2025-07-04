const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  password: { type: String, required: true, select: false },
  phone: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentMethods: [{
    type: { type: String, enum: ['upi', 'card', 'paypal'] },
    details: mongoose.Schema.Types.Mixed
  }],
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Add method to get simplified user data
UserSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', UserSchema);