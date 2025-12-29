const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_KEY = process.env.TWELVE_API_KEY;

/**
 * GET stock quote (for cards)
 * /api/stocks/quote?symbol=TCS.NS
 */
router.get('/quote', async (req, res) => {
  try {
    const symbol = req.query.symbol || 'TCS.NS';

    const response = await axios.get(
      'https://api.twelvedata.com/quote',
      {
        params: {
          symbol,
          apikey: API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stock quote' });
  }
});

/**
 * GET intraday data (for charts)
 * /api/stocks/intraday?symbol=TCS.NS
 */
router.get('/intraday', async (req, res) => {
  try {
    const symbol = req.query.symbol || 'TCS.NS';

    const response = await axios.get(
      'https://api.twelvedata.com/time_series',
      {
        params: {
          symbol,
          interval: '5min',
          outputsize: 40,
          apikey: API_KEY
        }
      }
    );

    res.json(response.data.values?.reverse() || []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch intraday data' });
  }
});

module.exports = router;
