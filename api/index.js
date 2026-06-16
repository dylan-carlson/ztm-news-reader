const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5177;
const API_TOKEN = process.env.THENEWSAPI_TOKEN;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/news/all', async (req, res) => {
  try {
    const { language = 'en', limit = 3, page = 1, categories, search } = req.query;

    const url = new URL('https://api.thenewsapi.com/v1/news/all');
    url.searchParams.append('api_token', API_TOKEN);
    url.searchParams.append('language', language);
    url.searchParams.append('limit', limit);
    url.searchParams.append('page', page);

    if (search) {
      url.searchParams.append('search', search);
      // Use today's date to ensure recent search results
      const today = new Date().toISOString().split('T')[0];
      url.searchParams.append('published_on', today);
    } else if (categories) {
      url.searchParams.append('categories', categories);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({ error: 'Daily request limit reached...' });
      }
      if (response.status === 401 || response.status === 403) {
        return res.status(response.status).json({ error: 'TheNewsApi authentication failed...' });
      }
      return res.status(response.status).json({ error: data.error?.message || 'API Error' });
    }

    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;