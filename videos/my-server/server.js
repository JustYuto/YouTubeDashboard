const express = require("express");
const axios = require("axios");
const cors = require("cors");
const port = 3000;


const { OAuth2Client } = require("google-auth-library");
const oauth2Client = new OAuth2Client();

const app = express(); 
let savedVideos = null;
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//1. Call the Google SDK from the frontend using whatever frontend
//2. Extract the code or access token and send to backend for verification.
//3. Use backend Google api to verify the code or token.
//4. If verified, sign them in the backend and then send a response to frontend

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
              maxResults: 100, 
              access_token: accessToken,
          }
      });
      console.log("YouTube Videos Response:", videosResponse.data); 
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

app.post("/updateVideo", async (req, res) => {
  console.log("AccessToken：", req.body.accessToken)
  const { videoId, title, description, accessToken } = req.body;
  try {
    const response = await axios.put(`https://www.googleapis.com/youtube/v3/videos?part=snippet`, {
      id: videoId,
      snippet: {
        title,
        description,
      },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({ message: "Video updated successfully", data: response.data });
  } catch (error) {
    console.error("Error updating video:", error);
    console.log(error.response.data);
    res.status(500).json({ message: "Failed to update video", error: error.response.data });
}
});


app.get("/api/videos", (req, res) => {
  if (savedVideos) {
    res.status(200).json(savedVideos);
  } else {
    res.status(404).json({ message: "No videos found" });
  }
});
