require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const groupOrderRoutes = require('./routes/groupOrder');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
require('./models/User');
require('./models/Dish');
require('./models/GroupOrder');

// 3. THEN your routes (must come AFTER models):
app.use('/api/group-orders', require('./routes/groupOrder'));  // This is the correct way to use routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`MongoDB: ${process.env.MONGODB_URI.split('@')[1]}`);
});