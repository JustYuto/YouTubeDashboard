const { fetchChannels, fetchMonetaryAnalytics, fetchChannelVideos } = require('../services/youtubeService');

exports.getChannels = async (req, res) => {
    try {
        const channels = await fetchChannels();
        res.status(200).json(channels);
    } catch (error) {
        console.error("Failed to fetch channels:", error);
        res.status(500).json({ message: "Failed to fetch channels" });
    }
};

exports.getChannelMonetaryAnalytics = async (req, res) => {
    const channelId = req.params.channelId; // Assuming channel ID is passed as a URL parameter
    const startDate = req.query.startDate; // Assuming start date is passed as a query parameter
    const endDate = req.query.endDate; // Assuming end date is passed as a query parameter

    try {
        const analyticsData = await fetchMonetaryAnalytics(channelId, startDate, endDate);
        res.status(200).json(analyticsData);
    } catch (error) {
        console.error("Failed to fetch channel analytics:", error);
        res.status(500).json({ message: "Failed to fetch channel analytics" });
    }
};

exports.getChannelVideos = async (req, res) => {
    const { playlistId } = req.params; // Assuming playlist ID is passed as a URL parameter
    const maxResults = req.query.maxResults || 25; // Optionally limit results via query parameter

    try {
        const videos = await fetchChannelVideos(playlistId, maxResults);
        res.status(200).json(videos);
    } catch (error) {
        console.error("Failed to fetch channel videos:", error);
        res.status(500).json({ message: "Failed to fetch channel videos" });
    }
};