const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const fetchPrices = require('./jobs/fetchPrices');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Schedule background job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
  console.log('Running background job to fetch cryptocurrency prices');
  fetchPrices();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});