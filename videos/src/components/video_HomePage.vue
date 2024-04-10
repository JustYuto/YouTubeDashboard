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
            <a href="/homePage" class="nav_link active">
              <i class="bx bx-grid-alt nav_icon"></i>
              <span class="nav_name">Home</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-user nav_icon"></i>
              <span class="nav_name">Videos</span>
            </a>
            <a href="/finance_info" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Finances</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Settings</span>
            </a>
            <a href="/backOfficePage" class="nav_link">
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
            <a href="/user_login" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Log out</span>
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
          </form>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="changeTab('To Fix')"
                >To Fix</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                @click.prevent="changeTab('All Videos')"
                >All Videos</a
              >
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
        v-for="(video, index) in paginatedVideos"
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
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage * videosPerPage >= filteredVideos.length"
      >
        Next
      </button>
    </div>
    <br /><br /><br /><br />
    <br /><br /><br /><br />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VideoHomePage",
  data() {
    return {
      currentTab: "All Videos",
      searchKeyword: "",
      videos: [],
      currentPage: 1,
      videosPerPage: 6,
      props: ["activeTab"],
      watch: {
        activeTab(newVal, oldVal) {
          if (newVal === "Search" && newVal !== oldVal) {
            this.fetchVideos();
          }
        },
      },
    };
  },
  // mounted() {
  //   this.fetchVideos();
  // },
  computed: {
    ...mapState(["videos"]),
    filteredVideos() {
      if (this.currentTab === "To Fix") {
        return this.videos.filter(
          (video) =>
            video.snippet.title.length <= 20 || video.snippet.title.length >= 70
        );
      } else if (this.searchKeyword.trim()) {
        return this.videos.filter((video) =>
          video.snippet.title
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
        );
      }
      return this.videos;
    },
    paginatedVideos() {
      const start = (this.currentPage - 1) * this.videosPerPage;
      const end = start + this.videosPerPage;
      return this.filteredVideos.slice(start, end);
    },
  },
  watch: {
    videos(newVideos) {
      console.log("Videos updated in component", newVideos);
    },
  },
  mounted() {
    console.log("video_HomePage has been mounted");
    console.log("Current store videos:", this.$store.state.videos);

    if (!this.videos || this.videos.length === 0) {
      this.fetchVideos();
    }
  },
  methods: {
    fetchVideos() {
      this.videos = this.$store.state.videos;
      this.filteredVideos = this.videos;
      console.log(this.videos);
    },
    changeTab(tabName) {
      this.currentTab = tabName;
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage * this.videosPerPage < this.filteredVideos.length) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>


<style>
</style>
<style src="../../css/style.css"></style>