const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { OAuth2Client } = require('google-auth-library');
const oauth2Client = new OAuth2Client()

const app = express();//Initializes a new Express application.
//app.use(express.json());//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(cors());// Enable CORS for all routes

//1. Call the Google SDK from the frontend using whatever frontend
//2. Extract the code or access token and send to backend for verification.
//3. Use backend Google api to verify the code or token.
//4. If verified, sign them in the backend and then send a response to frontend

  app.post('/auth/callback', async (req, res) => {
    try {
      // get the code from frontend, send Google api to verify the code
      const code = req.headers.authorization;
      console.log('Authorization Code:', code);

      // Exchange the authorization code for an access token
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: '785497567658-16251n3ml1bu0mp440s4krbsi25obke7.apps.googleusercontent.com',
          client_secret: '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',
          redirect_uri: 'postmessage',
          grant_type: 'authorization_code'
        }
      );
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);

      // Fetch user details using the access token
      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const userDetails = userResponse.data;
      console.log('User Details:', userDetails);

      // Process user details and perform necessary actions

      res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
  });


app.listen(8080, () => {
    console.log('Server running on port 8080');
});