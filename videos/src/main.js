import { createApp } from "vue";
import App from "./app.vue";
import { createRouter, createWebHistory } from "vue-router";
import VideoHomePage from "./components/video_HomePage.vue";
import FixVideoPage from "./components/fixVideoPage.vue";
import UserLogin from "./components/user_login.vue";
import FinanceInfo from "./components/finance_info.vue";
import signUp_page from "./components/signUp_page.vue";
import backOfficePage from "./components/backOfficePage.vue";
import homePage from "./components/homePage.vue";
import search from "./components/search.vue";
import AnalyticsInfo from "./components/analytics_info.vue";
import channelAnalytics from "./components/channelAnalytics.vue";
import { Chart } from 'chart.js';
import vue3GoogleLogin from 'vue3-google-login'
import store from './store/index';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';



// import VueYoutubeEmbed from "vue-youtube-embed";

const routes = [
  { path: "/", component: UserLogin },
  { path: "/video_HomePage", name: "home-video", component: VideoHomePage },
  { path: "/fix-video/:videoId", name: "fix-video", component: FixVideoPage },
  { path: "/user_login", name: "user-login", component: UserLogin },
  { path: "/finance_info", name: "finance-info", component: FinanceInfo },
  { path: "/signUp_page", name: "signUp_page", component: signUp_page },
  { path: "/backOfficePage", name: "backOfficePage", component: backOfficePage },
  { path: "/homePage", name: "homePage", component: homePage },
  { path: "/search", name: "search", component: search },
  { path: "/analytics_info", name: "analytics-info", component: AnalyticsInfo },
  { path: "/channelAnalytics", name: "channelAnalytics", component: channelAnalytics },
];

const router = createRouter({
  history: createWebHistory(),
  base: "/",
  routes,
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(BootstrapVue3);
// app.use(VueYoutubeEmbed);
app.use(vue3GoogleLogin, {
  clientId:
    "785497567658-16251n3ml1bu0mp440s4krbsi25obke7.apps.googleusercontent.com",
  // You can add scope and prompt if needed
  //scope: 'profile email',
  //prompt: 'select_account'
});

// Global use of Chart.js
app.config.globalProperties.$chart = Chart;

app.mount("#app");
