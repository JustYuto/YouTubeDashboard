const express = require('express');
const {google} = require('googleapis');

const app = express();
const port = 3000;

// Configure your OAuth2 client here
const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// Assuming you have set the OAuth2 client's credentials at this point
google.options({auth: oauth2Client});

app.get('/channel-analytics', async (req, res) => {
  try {
    const response = await google.youtubeAnalytics('v2').reports.query({
      ids: 'channel==MINE',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      metrics: 'estimatedRevenue,views,subscribersGained',
      dimensions: 'day',
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching channel analytics:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Scope for YouTube APIs
const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
];

// Generate a url that asks permissions for the YouTube scopes
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

// Routes
app.get('/', (req, res) => {
  res.send('YouTube Analytics API Service');
});

app.get('/auth', (req, res) => {
  res.redirect(authUrl);
});

// Your API endpoints will be added here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
