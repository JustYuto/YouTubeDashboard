import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios';

export default createStore({
  state: {
    hideConfigButton: true,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
    videos: [],
    channels: null,
    channelAnalytics: null,
    user: {
      personalData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
        location: '',
        picture: '',
      },
      socialProfiles: {
        tiktok: '',
        twitter: '',
        facebook: '',
        instagram: '',
        discord: {
          server: '',
          username: ''
        }
      },
      youtubeChannels: [],
    },
    isAuthenticated: false,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_CHANNELS(state, channels) {
      state.channels = channels;
    },
    SET_CHANNEL_ANALYTICS(state, channelAnalytics) {
      state.channelAnalytics = channelAnalytics;
    },
    CLEAR_USER_STATE(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    setVideos(state, videos) {
      state.videos = videos;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
  },
  actions: {
    initialize({ state }) {
      const token = state.token;
      if (token) {
        this.dispatch('fetchUser', token);
        this.dispatch('fetchChannels');
      }
    },
    async updatePersonalData({ commit }, personalData) {
      try {
        const response = await axios.patch('http://localhost:3000/api/profile/personal-data', personalData, { withCredentials: true });
        commit('SET_USER', response.data.updatedUser); // Assuming the backend returns the updated user
        alert('Personal data updated successfully.');
      } catch (error) {
        console.error('Error updating personal data:', error);
      }
    },
    async updateSocialLinks({ commit }, socialLinks) {
      try {
        const response = await axios.patch('http://localhost:3000/api/profile/social-links', socialLinks, { withCredentials: true });
        commit('SET_USER', response.data.updatedUser); // Update state with new user data
        alert('Social links updated successfully.');
      } catch (error) {
        console.error('Error updating social links:', error);
      }
    },
    async fetchChannels({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/youtube/channels', {withCredentials: true});
        commit('SET_CHANNELS', response.data.items[0]);
        console.log(response.data.items[0])
        this.dispatch('fetchChannelAnalytics', response.data.items[0].id);

      } catch (error) {
        console.error('Failed to fetch channel data:', error);
      }
    },
    async fetchChannelAnalytics({ commit }, channelID) {
      try {
        const response = await axios.get(`http://localhost:3000/api/youtube/channels/${channelID}/analytics/monetary?startDate=2021-01-01&endDate=2024-01-31`, {withCredentials: true});
        commit('SET_CHANNEL_ANALYTICS', response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch channel data:', error);
      }
    },
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
    async login({ commit }, token) {
      try {
        //   const response = await axios.post('http://localhost:3000/auth/google/callback', { code });
        if (token) {
          commit("SET_TOKEN", token);
          // commit('SET_USER', response.data.user);
          // Redirect here or in the component after dispatching this action
        } else {
          console.error("Token not received");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    async fetchUser({ commit}, token) {
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:3000/api/profile/me",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("SET_USER", response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        commit("CLEAR_USER_STATE");
      }
    },
    logout({ commit }) {
      commit("CLEAR_USER_STATE");
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.isAuthenticated,
    currentUser: state => state.user,
    allChannels: state => state.channels,
    channelAnalytics: state => state.channelAnalytics
  },
});
