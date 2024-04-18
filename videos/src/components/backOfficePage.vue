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
              <img
                src="@/assets/webtvasia logo.png"
                alt="Logo"
                class="logo-small"
              />
            </a>
            <a href="/backOfficePage" class="nav_link active">
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
                :class="{ active: activeTab === 'Retention Analytics' }"
                @click.prevent="setActiveTab('Retention Analytics')"
                >Retention Analytics</a
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
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                :class="{ active: activeTab === 'Channel Analytics' }"
                @click.prevent="setActiveTab('Channel Analytics')"
                >Channel Analytics</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <component :is="currentComponent"></component>
  </div>
  <div class="container" v-if="activeTab === 'Retention Analytics'">
    <h2>Managed YouTube Channels</h2>
    <div class="row">
      <div class="col-md-6" v-for="(channel, index) in channels" :key="index">
        <div class="mb-3 my-card">
          <div class="card-body">
            <h5 class="cardTitle">{{ channel.name }}</h5>
            <h6 class="card-subtitle mb-2">
              Channel ID: {{ channel.channelId }}
            </h6>
            <p class="card-text mb-2">Start since {{ channel.startDate }}</p>
            <p class="card-text mb-2">Subscribers: {{ channel.subscribers }}</p>
            <p class="card-text mb-2">Total views: {{ channel.views }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-if="activeTab === 'Retention Analytics'">
    <h2>Unlink Requests</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Email</th>
          <th>User ID</th>
          <th>Status</th>
          <th @click="sortRequestsByDate">Created At ▼</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in cancellationRequests" :key="request.id">
          <td>test@gmail.com</td>
          <td>{{ request.user_id }}</td>
          <td>{{ request.status }}</td>
          <td>{{ new Date(request.created_at).toLocaleDateString() }}</td>
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
    <div v-if="activeTab === 'Retention Analytics'">
      <button @click="downloadReport" class="btn btn-primary">
        Download Report
      </button>
    </div>
  </div>
  <div class="container" v-if="activeTab === 'Channel Analytics'"></div>
</template>
  
<script>
import Search from "./search.vue";
import channelAnalytics from "./channelAnalytics.vue";
import axios from "axios";

export default {
  components: {
    Search,
    channelAnalytics,
  },
  data() {
    return {
      activeTab: "Retention Analytics", // Set the default active tab
      cancellationRequests: [],
      channels: [
        {
          name: "Web TV Asia",
          channelId: "UCETlyq6M0vMRF9IOGOUEsyA",
          startDate: "1/1/2024",
          subscribers: "383,000", // Dummy data
          views: "5,238,708", // Dummy data
        },
      ],
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
    sortRequestsByDate() {
      this.cancellationRequests.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
  },
  created() {
    this.fetchChannels();
    this.fetchCancellationRequests();
  },
  computed: {
    currentComponent() {
      switch (this.activeTab) {
        case "Retention Analytics":
          return null;
        case "Search":
          return "Search";
        case "Channel Analytics":
          return "channelAnalytics";
        default:
          return null;
      }
    },
  },
};
</script>


  
  
  <style>
.card-text {
  color: rgb(225, 225, 225) strap primary color * /;
}
.my-card {
  background-color: #7d1b3e;
  color: #ffffff;
  border-radius: 10px 20px 30px 40px;
}
</style>
  <style src="../../css/style.css"></style>