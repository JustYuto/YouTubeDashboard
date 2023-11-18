import { createApp } from "vue";
import App from "./app.vue";
import VideoHomePage from "./components/video_HomePage.vue";
import FixVideoPage from "./components/fixVideoPage.vue";
import { createRouter, createWebHistory } from "vue-router";
// import VueYoutubeEmbed from "vue-youtube-embed";

const routes = [
  { path: "/", component: App },
  { path: "/video_HomePage", component: VideoHomePage },
  { path: "/fix-video/:videoId", name: "fix-video", component: FixVideoPage },
];

const router = createRouter({
  history: createWebHistory(),
  base: "/",
  routes,
});

const app = createApp(App);
app.use(router);
// app.use(VueYoutubeEmbed);
app.mount("#app");
