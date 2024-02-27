import { createApp } from "vue";
import App from "./app.vue";
import { createRouter, createWebHistory } from "vue-router";
import VideoHomePage from "./components/video_HomePage.vue";
import FixVideoPage from "./components/fixVideoPage.vue";
import UserLogin from "./components/user_login.vue";
import vue3GoogleLogin from "vue3-google-login";
// import VueYoutubeEmbed from "vue-youtube-embed";

const routes = [
  { path: "/", component: UserLogin },
  { path: "/video_HomePage", name: "home-video", component: VideoHomePage },
  { path: "/fix-video/:videoId", name: "fix-video", component: FixVideoPage },
  { path: "/user_login", component: UserLogin },
];

const router = createRouter({
  history: createWebHistory(),
  base: "/",
  routes,
});

const app = createApp(App);
app.use(router);
// app.use(VueYoutubeEmbed);
app.use(vue3GoogleLogin, {
  clientId:
    "785497567658-16251n3ml1bu0mp440s4krbsi25obke7.apps.googleusercontent.com",
  // You can add scope and prompt if needed
  //scope: 'profile email',
  //prompt: 'select_account'
});
app.mount("#app");
