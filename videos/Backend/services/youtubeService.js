const { oauth2Client, google } = require('../config');

exports.fetchChannels = async () => {
    const service = google.youtube({ version: 'v3', auth: oauth2Client });
    const response = await service.channels.list({
        part: 'snippet,contentDetails,statistics',
        mine: true,
    });
    return response.data;
};

exports.fetchMonetaryAnalytics = async (channelId, startDate, endDate) => {
    const analytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });
    const response = await analytics.reports.query({
        // Replace 'channel==MINE' with 'channel==' + channelId if you have the channel ID
        ids: 'channel==MINE',
        startDate: startDate, // Format YYYY-MM-DD
        endDate: endDate, // Format YYYY-MM-DD
        metrics: 'views,likes,shares,estimatedRevenue,estimatedAdRevenue,estimatedRedPartnerRevenue,grossRevenue,monetizedPlaybacks,playbackBasedCpm,adImpressions,cpm',
        dimensions: 'day',
    });
    return response.data;
};

exports.fetchChannelVideos = async (playlistId, maxResults = 25) => {
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const response = await youtube.playlistItems.list({
        part: 'snippet,contentDetails',
        playlistId: playlistId,
        maxResults: maxResults,
    });
    return response.data;
};