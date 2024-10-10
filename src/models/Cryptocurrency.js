const mongoose = require('mongoose');

const cryptocurrencySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum']
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema);