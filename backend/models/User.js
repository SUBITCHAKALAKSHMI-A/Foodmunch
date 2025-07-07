const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  password: { 
    type: String, 
    required: true, 
    select: false 
  },
  phone: { 
    type: String 
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentMethods: [{
    type: { 
      type: String, 
      enum: ['upi', 'card', 'paypal'] 
    },
    details: mongoose.Schema.Types.Mixed
  }]
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to get user data without sensitive info
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', UserSchema);