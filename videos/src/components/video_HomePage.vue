<template>
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
  </head>
  <header role="banner" id="fh5co-header">
    <div class="l-navbar" id="nav-bar">
      <nav class="nav">
        <div>
          <div class="nav_list">
            <a href="#" class="nav_link active">
              <i class="bx bx-grid-alt nav_icon"></i>
              <span class="nav_name">Home</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-user nav_icon"></i>
              <span class="nav_name">Videos</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Finances</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Settings</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-folder nav_icon"></i>
              <span class="nav_name">Partner Deals</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Assets</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Comments</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="gradient"></div>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">Videos</a>
        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <form class="d-flex" @submit.prevent="searchVideos">
            <input
              v-model="searchKeyword"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">To Fix</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ignored</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">All Videos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2>Videos</h2>
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="(video, index) in videos"
        :key="index"
      >
        <router-link
          :to="{
            name: 'fix-video',
            params: {
              videoId: video.id,
            },
            query: {
              title: video.snippet.title,
              tags: video.snippet.tags,
              description: video.snippet.description,
              thumbnail: video.snippet.thumbnails.high.url,
              channelTitle: video.snippet.channelTitle,
              channelId: video.snippet.channelId,
              date: video.snippet.publishedAt,
            },
          }"
        >
          <div class="card" style="background-color: transparent">
            <img
              :src="video.snippet.thumbnails.high.url"
              class="card-img-top"
              alt="Thumbnail of the video"
            />
          </div>
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ video.snippet.title }}</h5>
          <p class="card-text">{{ video.snippet.channelTitle }}</p>
        </div>
        <div>
          <small class="text-muted"
            >Views -
            {{
              new Date(video.snippet.publishedAt).toLocaleDateString()
            }}</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "VideoHomePage",
  // mounted() {
  //   this.fetchVideos();
  // },
  computed: {
    ...mapState(["videos"]),
  },
  mounted() {
    console.log("Video info:", this.videos);
  },
  methods: {
    // fetchVideos() {
    //   this.$store.dispatch("fetchVideos");
    // },
    // async searchVideos() {
    //   const accessToken = localStorage.getItem("youtube_access_token");
    //   if (!accessToken) {
    //     console.error("Access token is not available.");
    //     return;
    //   }
    //   try {
    //     const response = await axios.get(
    //       `https://www.googleapis.com/youtube/v3/search`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //         params: {
    //           part: "snippet",
    //           q: this.searchKeyword,
    //           maxResults: 5,
    //           type: "video",
    //         },
    //       }
    //     );
    //     console.log("YouTube API Response:", response.data);
    //     this.videos = response.data.items;
    //   } catch (error) {
    //     console.error("Error searching YouTube videos:", error);
    //   }
    // },
  },

  // const apiKey = "AIzaSyBuR7Xkx_wvsvEiFbwaj4eklNWGE0ih7XU";
};
</script>


<style>
</style>
<style src="../../css/style.css"></style>