import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      videos: [],
      analyticsData: null,
      analyticsData2: null,
      analyticsData3: null,
      analyticsData4: null,
    };
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    },
    setAnalyticsData(state, data) {
      state.analyticsData = data;
    },
    setAnalyticsData2(state, data2) {
      state.analyticsData2 = data2;
    },
    setAnalyticsData3(state, data3) {
      state.analyticsData3 = data3;
    },
    setAnalyticsData4(state, data4) {
      state.analyticsData4 = data4;
    },
  },
});