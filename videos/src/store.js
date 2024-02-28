import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [
    createPersistedState({
      key: 'vue-gauth',
      paths: ['userInfo'],
      storage: window.sessionStorage,
    }),
  ],
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {},
});
