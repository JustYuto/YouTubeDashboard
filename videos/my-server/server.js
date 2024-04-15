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
        
        // Extract channel ID
        const channelID = channelsResponse.data.items[0].id;
        console.log("Channel ID:", channelID);

        // Fetch YouTube playlist items
        const videosResponse = await youtube.playlistItems.list({
            part: 'snippet,contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults: 24,
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


