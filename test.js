const axios = require('axios');

// Base URL for your API
const BASE_URL = 'https://assignment-koinx-vd6v.onrender.com/api'; // Adjust if you're running on a different port

// Test the /stats endpoint
async function testStats(coin) {
  try {
    const response = await axios.get(`${BASE_URL}/stats`, {
      params: { coin }
    });
    console.log(`/stats response for ${coin}:`, response.data);
  } catch (error) {
    console.error(`/stats error for ${coin}:`, error.response ? error.response.data : error.message);
  }
}

// Test the /deviation endpoint
async function testDeviation(coin) {
  try {
    const response = await axios.get(`${BASE_URL}/deviation`, {
      params: { coin }
    });
    console.log(`/deviation response for ${coin}:`, response.data);
  } catch (error) {
    console.error(`/deviation error for ${coin}:`, error.response ? error.response.data : error.message);
  }
}

// Run the tests
async function runTests() {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  for (const coin of coins) {
    await testStats(coin); // Test /stats for each coin
    await testDeviation(coin); // Test /deviation for each coin
  }
}

// Execute the tests
runTests();
