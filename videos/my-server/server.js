const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs"); 
const path = require("path"); 
const port = 3000;
const session = require('express-session'); 
const mysql = require('mysql');

const { OAuth2Client } = require("google-auth-library");
const oauth2Client = new OAuth2Client();

const app = express(); 
let savedVideos = null;
app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true
}));
app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dashboard'
});

connection.connect();

app.use(session({
  secret: 'secret_key',
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: false } 
}));


app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) throw error;
    
    if (results.length > 0) {
      const user = results[0];
      req.session.userId = user.id;
      console.log(req.session.userId);
      if (user.user_type === 'Manager') {
        res.send({ success: true, userType: 'Manager', id: user.id, redirectTo: '/backOfficePage' });
      } else if (user.user_type === 'YouTuber') {
        res.send({ success: true, userType: 'YouTuber', id: user.id });
      } else {
        res.status(401).send({ success: false, message: 'Unauthorized' });
      }
    } else {
      res.status(401).send({ success: false, message: 'Login failed' });
    }
  });
});

//1. Call the Google SDK from the frontend using whatever frontend
//2. Extract the code or access token and send to backend for verification.
//3. Use backend Google api to verify the code or token.
//4. If verified, sign them in the backend and then send a response to frontend

async function getVideoStatistics(videoIds, accessToken) {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: 'statistics',
        id: videoIds.join(','), 
        access_token: accessToken,
      }
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching video statistics:", error);
    return [];
  }
}

app.post("/auth/callback", async (req, res) => {
    const code = req.headers.authorization;
    console.log("Authorization Code:", code);

    try {
        const { data } = await axios.post("https://oauth2.googleapis.com/token", {
            code,
            client_id: "785497567658-16251n3ml1bu0mp440s4krbsi25obke7.apps.googleusercontent.com",
            client_secret: "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",
            redirect_uri: "postmessage",
            grant_type: "authorization_code",
        });

        const accessToken = data.access_token;
        console.log("Access Token:", accessToken);

        // Initialize Google Auth client
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: accessToken });

        // Fetch YouTube channel details
        const youtube = google.youtube({ version: 'v3', auth });
        const channelsResponse = await youtube.channels.list({
            part: 'contentDetails',
            mine: true,
        });
        console.log("Channels Response:", channelsResponse.data);
        const uploadsPlaylistId = channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
        
        // Extract channel ID
        const channelID = channelsResponse.data.items[0].id;
        console.log("Channel ID:", channelID);

      const videosResponse = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
          params: {
              part: 'snippet,contentDetails',
              playlistId: uploadsPlaylistId,
              maxResults: 25, 
              access_token: accessToken,
          } 
      });
      console.log("YouTube Videos Response:", videosResponse.data); 
      const videoIds = videosResponse.data.items.map(item => item.contentDetails.videoId);
      const videoStatistics = await getVideoStatistics(videoIds, accessToken);
      console.log("Video statistics:", videoStatistics);
      savedVideos = videosResponse.data;

        // Fetch user details using the access token
        const oauth2 = google.oauth2({ version: 'v2', auth });
        const userResponse = await oauth2.userinfo.get();
        console.log("User Info:", userResponse.data);

        // Initializing YouTube Analytics API
        const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth });
        const analyticsResponse = await youtubeAnalytics.reports.query({
            ids: `channel==${channelID}`,
            startDate: '2023-10-01',
            endDate: '2024-03-01',
            metrics: 'estimatedRevenue,estimatedAdRevenue,grossRevenue,estimatedRedPartnerRevenue',
            dimensions: 'month',
        });
        console.log("Analytics Response:", analyticsResponse.data);
        
        // Fetch estimated revenue reports
        fetchEstimatedRevenueReports(auth).then(() => {
        //    console.log("Report fetching initiated.");
        }).catch(error => {
            console.error("Error initiating report fetching:", error);
        });
        
        // Fetch additional YouTube analytics data for city and metrics
        const analyticsData2Response = await youtubeAnalytics.reports.query({
            ids: `channel==${channelID}`,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            metrics: 'estimatedMinutesWatched,averageViewDuration,views',
            dimensions: 'city',
            sort: '-estimatedMinutesWatched',
            maxResults: 10
        });
        console.log("Analytics Data2 Response:", analyticsData2Response.data);

        // Fetch additional YouTube analytics data for age and gender
        const analyticsData3Response = await youtubeAnalytics.reports.query({
            ids: `channel==${channelID}`,
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            metrics: 'viewerPercentage',
            dimensions: 'ageGroup,gender',
            sort: '-viewerPercentage',
        });
        console.log("Analytics Data3 Response:", analyticsData3Response.data);

        // Fetch additional YouTube analytics data for subscribers by country
        const analyticsData4Response = await youtubeAnalytics.reports.query({
            ids: `channel==${channelID}`,
            startDate: '2023-10-01',
            endDate: '2024-03-01',
            metrics: 'subscribersGained,subscribersLost,views',
            dimensions: 'month,country',
            sort: 'month,-subscribersGained',
        });
        console.log("Analytics Data3 Response:", analyticsData4Response.data);

        // Combine all the data into one response object
        const responsePayload = {
            accessToken: accessToken,
            videoStatistics: videoStatistics, 
            user: userDetails,
            channelDetails: channelsResponse.data,
            videos: videosResponse.data,
            user: userResponse.data,
            analyticsData: analyticsResponse.data,
            analyticsData2: analyticsData2Response.data,
            analyticsData3: analyticsData3Response.data,
            analyticsData4: analyticsData4Response.data,
            message: "Authentication successful",
        };
        
        res.status(200).json(responsePayload);

    } catch (error) {
        console.error("Error during API request:", error);
        res.status(500).json({ message: "Failed to process request" });
    }
});

app.get("/api/videos", (req, res) => {
    if (savedVideos) {
        res.status(200).json(savedVideos);
    } else {
        res.status(404).json({ message: "No videos found" });
    }
});


app.get("/api/report", (req, res) => {
  // Check if there are any saved videos
  if (savedVideos && savedVideos.items) {
    // Create a string to hold your CSV data
    let csvContent = "Video Title,Video ID,Video URL\n"; // CSV header

    // Loop over savedVideos to add each to the CSV string
    savedVideos.items.forEach((item) => {
      const videoTitle = item.snippet.title.replace(/,/g, "");
      const videoId = item.snippet.resourceId.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const publishedAt = item.snippet.publishedAt; 
      const viewCount = item.statistics.viewCount; 
      const likeCount = item.statistics.likeCount; 
      const dislikeCount = item.statistics.dislikeCount; 
      const commentCount = item.statistics.commentCount;

      
      csvContent += `${videoTitle},${videoId},${videoUrl},${publishedAt},${viewCount},${likeCount},${dislikeCount},${commentCount}\n`;
    });

    // Define the path and filename for the CSV file
    const filePath = path.join(__dirname, 'videos-report.csv');
    // Write the CSV file to the server's file system
    fs.writeFile(filePath, csvContent, (err) => {
      if (err) {
        console.error('Error writing CSV file:', err);
        res.status(500).json({ message: "Failed to generate report" });
        return;
      }

      // Set headers for downloading the file with a custom filename
      res.setHeader('Content-Disposition', 'attachment; filename=videos-report.csv');
      res.setHeader('Content-Type', 'text/csv');
      // Send the CSV file content to the client, causing it to download
      res.download(filePath, 'videos-report.csv', (err) => {
        if (err) {
          console.error('Error downloading CSV file:', err);
        }
        // Remove the file after sending it to the client
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting CSV file:', err);
        });
      });
    });
  } else {
    // Send an error response if there are no videos
    res.status(404).json({ message: "No videos to download" });
  }
});

  app.post('/cancellation-requests', (req, res) => {

    const userId = req.body.user_id;

    const query = 'INSERT INTO cancellation_requests (user_id, status) VALUES (?, ?)';
    const values = [userId, 'pending'];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Database error: ', error);
        return res.status(500).send('Inner server error');
      }

      res.send('Your request was sent.');
    });
  });

app.get('/cancellation-requests/review', (req, res) => {
  const query = 'SELECT * FROM cancellation_requests';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching cancellation requests:', error);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

app.patch('/cancellation-requests/status/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  const query = 'UPDATE cancellation_requests SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (error, results) => {
    if (error) {
      console.error('Error updating cancellation request:', error);
      res.status(500).send('Server error');
    } else {
      res.send('Cancellation request updated successfully.');
    }
  });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

async function fetchEstimatedRevenueReports(auth) {
    const youtubeReporting = google.youtubereporting({ version: 'v1', auth });
    try {
        const reportTypesResponse = await youtubeReporting.reportTypes.list({});
        // List available report types
        // console.log(reportTypesResponse.data);
        // Find the reportType object here
        const reportType = reportTypesResponse.data.reportTypes.find(reportType => reportType.name.includes('estimated_revenue'));
        
        if (reportType) {
            const reportTypeId = reportType.id; // Correctly use reportType within its scope
            // Proceed with using reportTypeId...
            console.log("Report Type ID:", reportTypeId); // Confirming we have the ID

            const jobResponse = await youtubeReporting.jobs.create({
                resource: {
                    reportTypeId: reportTypeId,
                    name: 'Estimated Revenue Report'
                }
            });
            console.log("Job Response:", jobResponse.data);
            // After creating the job, you'll need to periodically check for completion and then download the report.
        } else {
            console.error('Estimated revenue report type not found');
            // Handle the case where the report type is not found
        }
    } catch (error) {
        console.error("Error fetching estimated revenue reports:", error);
    }
}


