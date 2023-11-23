const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.post('/auth/callback', async (req, res) => {
  try {
    const { code } = req.body;
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET, 
      redirect_uri: 'http://localhost:8080/auth/callback',
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token, id_token } = response.data;
    // handle tokens and user data

    res.json({ access_token, refresh_token, user: {/* user details */} });
  } catch (error) {
    console.error('Error exchanging auth code:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
