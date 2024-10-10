const express = require('express');
const Cryptocurrency = require('../models/Cryptocurrency');

const router = express.Router();

// GET /api/stats - Fetch latest record for a specific coin
router.get('/stats', async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    // Fetch the latest record for the requested coin
    const latestData = await Cryptocurrency.findOne({ id: coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'Data not found for the specified coin' });
    }

    // Respond with the most recent record
    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/deviation - Fetch the standard deviation of the last 100 records
router.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    // Fetch the latest 100 prices, sorted by timestamp (most recent first)
    const prices = await Cryptocurrency.find({ id: coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price');

    if (prices.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    const priceValues = prices.map(p => p.price);

    if (priceValues.length < 2) {
      // If there's only 1 record or identical records, standard deviation is 0
      return res.json({ deviation: 0 });
    }

    // Calculate mean
    const mean = priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length;

    // Calculate variance
    const squaredDifferences = priceValues.map(price => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / priceValues.length;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    res.json({
      deviation: parseFloat(standardDeviation.toFixed(2))
    });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
