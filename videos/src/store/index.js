import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState({
    
    paths: ['videos', 'userId'], 
    storage: window.sessionStorage, 
  })],
  state() {
    return {
      videos: [],
      userId: null,
    };
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    },
    setUserId(state, userId) {
      state.userId = userId;
    }
  },
});
