const express = require("express");
const axios = require("axios");
const cors = require("cors");
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
        id: videoIds.join(','), // 複数のビデオIDをカンマ区切りの文字列で指定
        access_token: accessToken,
      }
    });
    return response.data.items; // 各ビデオの統計情報を含む配列を返す
  } catch (error) {
    console.error("Error fetching video statistics:", error);
    return [];
  }
}

app.post("/auth/callback", async (req, res) => {
  try {
    // get the code from frontend, send Google api to verify the code
    const code = req.headers.authorization;
    console.log("Authorization Code:", code);

    // Exchange the authorization code for an access token
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id:
        "785497567658-16251n3ml1bu0mp440s4krbsi25obke7.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "postmessage",
      grant_type: "authorization_code",
    });

    const accessToken = response.data.access_token;
    console.log("Access Token:", accessToken);

    const youtubeResponse = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
          params: {
              part: 'contentDetails',
              mine: true, 
              access_token: accessToken,
          }
      });

      console.log("YouTube Channel Response:", youtubeResponse.data);
      const uploadsPlaylistId = youtubeResponse.data.items[0].contentDetails.relatedPlaylists.uploads;



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
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(userResponse);
    const userDetails = userResponse.data;

    const responsePayload = {
      accessToken: accessToken,
      videos: videosResponse.data,
      videoStatistics: videoStatistics, 
      user: userDetails,
      message: "Authentication successful"
    };

    res.status(200).json(responsePayload);
  } catch (error) {
    console.error("Error saving code:", error);
    res.status(500).json({ message: "Failed to save code" });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
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