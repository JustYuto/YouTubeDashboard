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
            <a href="#" @click.prevent="goToFinancePage" class="nav_link">
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
  <div class="container-fluid" id="main-container">
    <div class="row">
      <div class="row finances-header">
        <div class="col-md-2">
          <h1>Finances</h1>
        </div>
        <div class="col-md-5 text-right finances-details">
          <p>Next Payout: <strong>$1,354</strong> on 03' 24</p>
        </div>
        <div class="col-md-5 text-right finances-details">
          <p>All Payouts: <strong>$23,543</strong> since signup</p>
        </div>
      </div>
    </div>
    <!-- Upper Row -->
    <div class="row">
      <!-- Multiline Chart Column -->
      <div class="col-md-6">
        <canvas id="earningsChart"></canvas>
      </div>
      <!-- Multiselect Column -->
      <div class="col-md-6">
        <div class="multiselect-col">
          <div class="channels-list" style="height: 270px; overflow-y: auto">
            <div
              v-for="(channel, index) in channels"
              :key="index"
              class="channel-item d-flex align-items-center"
            >
              <input
                type="checkbox"
                :value="channel"
                v-model="selectedChannels"
                :id="`channel-${index}`"
                class="channel-checkbox"
              />
              <label
                :for="`channel-${index}`"
                class="channel-label d-flex align-items-center"
              >
                <img
                  :src="channel.profilePic"
                  alt=""
                  class="profile-pic me-1"
                  style="width: 40px; height: 40px; border-radius: 50%"
                />
                <div>
                  <span>{{ channel.name }}</span>
                  <span class="subscribers"
                    >{{ channel.subscribers }} subscribers</span
                  >
                </div>
                <span
                  class="dot"
                  :style="{ backgroundColor: channel.color }"
                ></span>
              </label>
            </div>
          </div>
          <div class="button-container d-flex justify-content-between">
            <button @click="selectAllChannels" class="btn btn-custom">
              Select All
            </button>
            <button @click="deselectAllChannels" class="btn btn-custom">
              Deselect All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lower Row -->
    <div class="row">
      <!-- This Month Earnings Column -->
      <div class="col-md-6">
        <h3>This Month Earnings</h3>
        <p>Total: ${{ totalEarnings }}</p>
        <canvas id="monthlyEarningsChart"></canvas>
        <p>Percentage increase: {{ percentageIncrease }}%</p>
      </div>
      <!-- History Column -->
      <div class="col-md-6 history-list">
        <div class="row">
          <div class="col-auto">
            <h3>History</h3>
          </div>
          <!--
          <div class="col text-right">
            <div class="dropdown ml-auto" @click="toggleDropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button col-md-6 d-flex justify-content-end">
                All Categories
              </button>
              <div class="dropdown-menu" v-show="isDropdownOpen">
                <a class="dropdown-item" href="#" @click.prevent="filterHistory('All')">All</a>
                <a class="dropdown-item" href="#"
                  v-for="category in uniqueCategories"
                  :key="category"
                  @click.prevent="filterHistory(category)">
                  {{ category }}
                </a>
              </div>
            </div>
          </div>
        --></div>
        <div v-for="(item, index) in history" :key="index" class="history-item">
          <div class="history-content">
            <span>{{ item.name }}</span>
            <span>{{ item.date }}</span>
            <span
              :class="{
                'text-positive': item.amount > 0,
                'text-negative': item.amount < 0,
              }"
            >
              {{ item.amount > 0 ? "+" : "" }}${{ item.amount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default {
  data() {
    return {
      selectedChannels: [],
      channels: [
        {
          name: "Marques Brownlee",
          subscribers: "6M",
          profilePic: "/assets/Marques Brownlee.jpg",
          color: "#FF0000",
        },
        {
          name: "Mr Beast - Jimmy",
          subscribers: "16M",
          profilePic: "/assets/Mr Beast.jpg",
          color: "#FFC107",
        },
        {
          name: "Ms Yeah 办公室小野",
          subscribers: "636K",
          profilePic: "/assets/Ms Yeah.jpg",
          color: "#EEABD1",
        },
        {
          name: "Whindersson Nunes",
          subscribers: "1M",
          profilePic: "/assets/Whindersson Nunes.jpeg",
          color: "#28A745",
        },
        {
          name: "HolaSoyGerman",
          subscribers: "2M",
          profilePic: "/assets/HolaSoyGerman.jpg",
          color: "#AACCFF",
        },
        {
          name: "Liza Koshy",
          subscribers: "332K",
          profilePic: "/assets/Liza Koshy.jpg",
          color: "#EAEAEA",
        },
        // Add other channels here
      ],
      totalEarnings: 2000,
      percentageIncrease: 15,
      history: [
        { name: "Earnings YouTube Channel", date: "2022-01-01", amount: 200 },
        { name: "Payment Regular", date: "2022-01-02", amount: -300 },
        { name: "Earnings YouTube Recruiter", date: "2022-01-01", amount: 500 },
        { name: "Earnings YouTube Channel", date: "2022-01-03", amount: 700 },
        { name: "Payment Regular", date: "2022-01-01", amount: -100 },
        { name: "Earnings YouTube Recruiter", date: "2022-01-04", amount: 900 },
        // Add other history items here
      ],
      colors: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(199, 199, 199, 1)",
        "rgba(83, 102, 255, 1)",
        "rgba(40, 159, 64, 1)",
        "rgba(210, 45, 53, 1)",
      ],
      earningsData: {
        "Marques Brownlee": [0, 100, 50, 150, 230, 210, 280],
        "Mr Beast - Jimmy": [100, 200, 130, 180, 270, 290, 260],
        "Ms Yeah 办公室小野": [250, 180, 150, 250, 230, 310, 290],
        "Whindersson Nunes": [130, 100, 250, 150, 270, 280, 320],
        HolaSoyGerman: [200, 150, 180, 310, 210, 300, 360],
        "Liza Koshy": [120, 220, 230, 180, 170, 290, 160],
      },
      isDropdownOpen: false,
    };
  },
  mounted() {
    this.selectAllChannels();
    this.renderEarningsChart();
    this.renderMonthlyEarningsChart();
  },
  methods: {
    data() {
      return {
        selectedCategory: "All", // To keep track of the selected category
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      filterHistory(category) {
        this.selectedCategory = category;
      },
      // other methods
    },
    selectAllChannels() {
      this.selectedChannels = this.channels.map((channel) => channel);
    },
    deselectAllChannels() {
      this.selectedChannels = [];
    },
    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    renderEarningsChart() {
      this.destroyChart(); // Destroy the existing chart before creating a new one
      const ctx = document.getElementById("earningsChart").getContext("2d");
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: this.selectedChannels.map((channel) => {
            // Removed 'index' from here
            return {
              label: channel.name,
              data: this.earningsData[channel.name],
              borderColor: channel.color,
              backgroundColor: this.getTransparentColor(channel.color),
              borderWidth: 2,
            };
          }),
        },
      });
    },
    getRandomColor() {
      // This is a placeholder function. You should replace it with actual logic to generate random colors.
      return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`;
    },
    getTransparentColor(color) {
      // This is a placeholder function. You should replace it with actual logic to convert colors to their transparent equivalents.
      return color.replace("1)", "0.2)");
    },
    renderMonthlyEarningsChart() {
      const ctx = document
        .getElementById("monthlyEarningsChart")
        .getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
          datasets: [
            {
              label: "Monthly Earnings",
              data: [500, 700, 1200, 1500, 1300, 1800],
              borderColor: "rgba(75,192,192,1)", // color of the line
              backgroundColor: "rgba(75,192,192,1)", // fill color under the line
              borderWidth: 2, // thickness of the line
            },
            {
              label: "Monthly Earnings",
              data: [1300, 900, 1500, 1700, 900, 1200],
              borderColor: "rgba(255,0,127,1)", // color of the line
              backgroundColor: "rgba(255,0,127,1)", // fill color under the line
              borderWidth: 2, // thickness of the line
            },
            {
              label: "Monthly Earnings",
              data: [1500, 900, 1200, 1700, 1300, 1600],
              borderColor: "rgba(0,255,127,1)", // color of the line
              backgroundColor: "rgba(0,255,127,1)", // fill color under the line
              borderWidth: 2, // thickness of the line
            },
            {
              label: "Monthly Earnings",
              data: [800, 1700, 2100, 1900, 2500, 2200],
              borderColor: "rgba(255,255,0,1)", // color of the line
              backgroundColor: "rgba(255,255,0,1)", // fill color under the line
              borderWidth: 2, // thickness of the line
            },
          ],
        },
      });
    },
  },
  watch: {
    selectedChannels: function () {
      // This function will run whenever selectedChannels changes
      this.renderEarningsChart();
    },
  },
  computed: {
    uniqueCategories() {
      // Extracts all names from the history array and then filters out duplicates
      const names = this.history.map((item) => item.name);
      return Array.from(new Set(names)); // Convert Set back to Array to get unique values
    },
    filteredHistory() {
      if (this.selectedCategory === "All") {
        return this.history;
      } else {
        return this.history.filter(
          (item) => item.name === this.selectedCategory
        );
      }
    },
  },
};
</script>

<style>
#main-container {
  padding-top: 50px; /* Adjust this value based on the height of your navbar */
  padding-left: 250px; /* Adjust this value based on the width of your sidebar */
}

/* Example media query for smaller screens */
@media (max-width: 768px) {
  #main-container {
    padding-left: 100px; /* Smaller padding for smaller screens if the sidebar is also smaller */
  }
  .finances-header .col-md-6 {
    text-align: center; /* Center text for small screens */
  }
  .finances-header .col-md-6:first-child {
    margin-bottom: 10px; /* Add space between the title and details on small screens */
  }
}

.finances-header {
  background: rgba(18, 52, 86, 0); /* Replace with the gradient you want */
  padding: 10px 0; /* Add padding as necessary */
  color: #ffffff; /* Replace with the color of your text */
}

.finances-header h1 {
  margin: 0;
  padding: 0;
  font-size: 31px; /* Adjust font size as needed */
}

.finances-details p {
  margin: 0;
  font-size: 16px; /* Adjust font size as needed */
  line-height: 1.5; /* Adjust line height as needed */
}

.finances-details strong {
  margin: 0;
  font-size: 19px; /* Adjust font size as needed */
  line-height: 1.5; /* Adjust line height as needed */
}

.multiselect-col input[type="checkbox"] {
  margin-right: 10px; /* Spacing after checkbox */
}

.multiselect-col div {
  display: block;
}

.multiselect-col input[type="checkbox"] {
  vertical-align: middle;
  margin-right: 0.5rem; /* Adjust spacing between checkbox and label as needed */
  margin-left: 0.5rem;
}

.multiselect-col label {
  vertical-align: middle;
}

.history-list .col {
  margin-right: -15px;
  padding-right: 0;
}

.history-item + .history-item {
  border-top: 1px solid #444; /* Or any color that suits your design */
}

.history-content {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.history-content > span {
  flex: 1; /* Gives each span equal width */
  text-align: center; /* Centers text within each span */
}

.history-content > span:first-child {
  flex: 2; /* Makes the first child twice as wide as the others */
  text-align: left; /* Aligns the first child to the left */
}

.history-content > span:last-child {
  text-align: right; /* Aligns the last child to the right */
  flex: 1;
}

.text-positive {
  color: green;
}

.text-negative {
  color: red;
}

.dropdown {
  flex: 1;
  display: inline-block; /* Ensures the dropdown is aligned correctly */
}

.profile-pic {
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0px 15px 0px 15px;
}

.channel-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* This will push the dot to the far right */
  padding: 5px; /* Adjust padding to your preference */
  background: #333; /* Dark background color */
  border-radius: 10px; /* Rounded corners for the items */
  margin-bottom: 5px; /* Space between items */
}

.channels-list {
  border: none;
  border-radius: 5px;
}

.dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 30px;
}

.channel-label {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.channel-label > div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.subscribers {
  display: block; /* Make the subscribers display under the channel name */
  color: grey;
  font-size: smaller;
  margin-top: 2px;
}

.button-container .btn-custom {
  flex: 1; /* Each button will take up equal space */
  margin: 15px 5px; /* Spacing between buttons */
}

.btn-custom {
  width: auto; /* Make buttons wider */
  background-color: transparent; /* Make buttons transparent */
  color: white; /* Text color */
  border: 1px solid white !important; /* White border */
  margin: 5px 0; /* Margin for spacing */
}

.btn-custom:hover {
  background-color: #f0f0f0; /* Grey background on hover */
  color: #000000; /* Change text color as needed */
}

/* Adjust the button container to make the buttons align nicely */
.d-flex.justify-content-center {
  flex-direction: column; /* Stack buttons vertically */
  align-items: stretch; /* Stretch buttons to fill the width */
}
</style>
<style src="../../css/style.css"></style>
