import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "vue-gauth",
      paths: ["userInfo"],
      storage: window.sessionStorage,
    }),
  ],
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo: function (state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {},
});
