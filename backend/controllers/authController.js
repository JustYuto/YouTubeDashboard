const { oauth2Client } = require("../config");
const User = require('../models/User');
const frontendUrl = 'http://localhost:8080';
const {
  getAccessToken,
  getGoogleUser,
} = require("../services/googleAuthService");

exports.initiateAuth = (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/yt-analytics.readonly",
    "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  ];
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    response_type: 'code',
    scope: scopes,
  });
  res.redirect(authUrl);
};

exports.handleAuthCallback = async (req, res) => {
    const { code } = req.query; // Or wherever you're getting the code from
    try {
      const tokens = await getAccessToken(code);
      const googleProfile = await getGoogleUser(tokens);
      
      console.log(googleProfile)
  
      // Check if user already exists
      let user = await User.findOne({ 'personalData.email': googleProfile.email });
      if (!user) {
        // User doesn't exist, create a new one
        user = new User({
            personalData: {
              firstName: googleProfile.given_name, // Google profile's given name
              lastName: googleProfile.family_name, // Google profile's family name
              email: googleProfile.email, // The primary email address from Google profile
              phone: '', // Placeholder, as phone number is not available from Google OAuth
              gender: '', // Placeholder, as gender is not available from Google OAuth
              birthday: null, // Placeholder, as birthday is not available from Google OAuth
              location: '', // Placeholder, as location is not directly available from Google OAuth
              picture: googleProfile.picture
            },
            socialProfiles: {
              tikTok: '', // Placeholder, as this is not available from Google OAuth
              facebook: '', // Placeholder, as this is not available from Google OAuth
              instagram: '', // Placeholder, as this is not available from Google OAuth
              twitter: '', // Placeholder, as this is not available from Google OAuth
              discord: {
                server: '', // Placeholder
                username: '', // Placeholder
              },
            },
            youtubeChannels: [], // Placeholder, as this is not directly available from Google OAuth
          });
    
          await user.save(); // Save the new user
      }

      req.session.userId = user._id; // Or any other user identifier or necessary data
      req.session.tokens = tokens; // Optionally save tokens if needed for subsequent API calls

  
      // At this point, the user is either fetched or newly created
      // Proceed with your login or token generation logic

      const userToken = tokens.id_token; // Assume you generate or receive a token

      res.redirect(`${frontendUrl}/auth/callback?token=${userToken}&code=${code}`);
      // res.status(200).json({ message: "User authenticated", user });
    } catch (error) {
      console.error("Authentication failed:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  };

  exports.isLoggedIn = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: "Could not log out, please try again" });
      }
      res.status(200).json({ message: "User logged out" });
    });
  };