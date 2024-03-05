import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      videos: [],
    };
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    },
  },
});