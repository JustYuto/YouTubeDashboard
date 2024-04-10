import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      videos: [],
      analyticsData: null,
    };
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    },
    setAnalyticsData(state, data) {
      state.analyticsData = data;
    },
  },
});