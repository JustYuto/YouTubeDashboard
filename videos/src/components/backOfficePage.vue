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
            <a href="/user_login" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Log out</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                :class="{ active: activeTab === 'Channel Analytics' }"
                @click.prevent="setActiveTab('Channel Analytics')"
                >Channel Analytics</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                :class="{ active: activeTab === 'Search' }"
                @click.prevent="setActiveTab('Search')"
                >Search</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="activeTab === 'Channel Analytics'">
      <button @click="downloadReport" class="btn btn-primary">
        Download Report
      </button>
    </div>
    <div class="container"></div>
    <div v-if="activeTab === 'Search'">
      <VideoHomePage ref="videoHomePage" />
    </div>
  </div>
  <div class="container">
    <h2>Cancellation Requests</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in cancellationRequests" :key="request.id">
          <td>{{ request.id }}</td>
          <td>{{ request.user_id }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.created_at }}</td>
          <td>
            <button @click="updateStatus(request.id, 'accepted')">
              Accept
            </button>
            <button @click="updateStatus(request.id, 'rejected')">
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import VideoHomePage from "./video_HomePage.vue";
import axios from "axios";

export default {
  components: {
    VideoHomePage,
  },
  data() {
    return {
      activeTab: "Channel Analytics", // Set the default active tab
      channels: [],
      cancellationRequests: [],
    };
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    updateVideos() {
      this.$refs.videoHomePage.fetchVideos();
    },
    downloadReport() {
      const videos = this.$store.state.videos;

      axios
        .get("http://localhost:3000/api/report", { videos })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "channel-report.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Report generation failed:", error);
        });
    },
    fetchChannels() {
      axios
        .get("http://localhost:3000/api/manager/channels", {
          withCredentials: true,
        })
        .then((response) => {
          this.channels = response.data;
        })
        .catch((error) => {
          console.error("Error fetching channels:", error);
        });
    },
    fetchCancellationRequests() {
      axios
        .get("http://localhost:3000/cancellation-requests/review", {
          withCredentials: true,
        })
        .then((response) => {
          this.cancellationRequests = response.data;
        })
        .catch((error) =>
          console.error("Error fetching cancellation requests:", error)
        );
    },
    updateStatus(id, newStatus) {
      axios
        .patch(
          `http://localhost:3000/cancellation-requests/status/${id}`,
          { status: newStatus },
          { withCredentials: true }
        )
        .then(() => {
          alert("Status updated successfully");
          // Reload the requests to reflect the changes
          this.fetchCancellationRequests();
        })
        .catch((error) => {
          console.error("Error updating status:", error);
        });
    },
  },
  created() {
    this.fetchChannels();
    this.fetchCancellationRequests();
  },
};
</script>


  
  
  <style>
</style>
  <style src="../../css/style.css"></style>