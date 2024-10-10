const axios = require('axios');
const Cryptocurrency = require('../models/Cryptocurrency');
const dotenv = require('dotenv');
dotenv.config();


const COIN_IDS = ['bitcoin', 'matic-network', 'ethereum'];
const API_KEY = process.env.COINGECKO_API_KEY;
console.log(API_KEY);

async function fetchPrices() {
  try {
    console.log('Fetching prices...');
    
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: COIN_IDS.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
        x_cg_demo_api_key: API_KEY
      }
    });

    const data = response.data;

    for (const coinId of COIN_IDS) {
      if (data[coinId]) {
        await Cryptocurrency.create({
          id: coinId,
          price: data[coinId].usd,
          marketCap: data[coinId].usd_market_cap,
          change24h: data[coinId].usd_24h_change
        });
        console.log(`Updated ${coinId} data`);
      } else {
        console.log(`No data found for ${coinId}`);
      }
    }

    console.log('Cryptocurrency prices updated successfully');
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error.response ? error.response.data : error.message);
  }
}

module.exports = fetchPrices;