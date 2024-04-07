const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { google } = require("googleapis");
const port = 3000;

const app = express(); 
let savedVideos = null;
app.use(cors());
app.use(express.json());

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

        // Fetch YouTube playlist items
        const videosResponse = await youtube.playlistItems.list({
            part: 'snippet,contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults: 25,
        });
        console.log("Videos Response:", videosResponse.data); 
        savedVideos = videosResponse.data;

        // Fetch user details using the access token
        const oauth2 = google.oauth2({ version: 'v2', auth });
        const userResponse = await oauth2.userinfo.get();
        console.log("User Info:", userResponse.data);

        // Initializing YouTube Analytics API
        const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth });
        const analyticsResponse = await youtubeAnalytics.reports.query({
            ids: 'channel==MINE',
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            metrics: 'views',
            dimensions: 'day',
        });
        console.log("Analytics Response:", analyticsResponse.data);

        // Combine all the data into one response object
        const responsePayload = {
            accessToken: accessToken,
            channelDetails: channelsResponse.data,
            videos: videosResponse.data,
            user: userResponse.data,
            analyticsData: analyticsResponse.data,
            message: "Authentication successful",
        };

        res.status(200).json(responsePayload);
    } catch (error) {
        console.error("Error during API request:", error);
        res.status(500).json({ message: "Failed to process request" });
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
