const axios = require('axios')

const API_KEY = process.env.STOCK_API_KEY

// Example using a generic stock API pattern
async function getStockQuote(symbol) {
  const response = await axios.get(
    `https://api.example.com/quote`,
    {
      params: {
        symbol,
        apikey: API_KEY,
      },
    }
  )

  return response.data
}

module.exports = {
  getStockQuote,
}
