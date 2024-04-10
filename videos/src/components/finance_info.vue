<template>
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS 4 (to be migrated)
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />-->
    <link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
    <!-- Bootstrap CSS -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">

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
            <a href="#" @click.prevent="goToVideoPage" class="nav_link">
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
          <h1>Revenues</h1>
        </div>
        <div class="col-md-5 text-end finances-details">
          <p>Next Payout: <strong>$1,354</strong> on 04' 24</p>
        </div>
        <div class="col-md-5 text-end finances-details">
          <p>All Payouts: <strong>$23,543</strong> since signup</p>
        </div> 
      </div>
    </div>
    <!-- Upper Row -->
    <div class="row">
      <!-- Multiline Chart Column -->
      <div class="col-md-6">
        <canvas ref="earningsChart" id="earningsChart"></canvas>
      </div>
      <!-- Multiselect Column -->
      <div class="col-md-6">
        <div class="multiselect-col">
          <div class="channels-list" style="height: 270px; overflow-y: auto;">
          <div v-for="(channel, index) in channels" :key="index" class="channel-item d-flex align-items-center">
            <input 
              type="checkbox" 
              :value="channel" 
              v-model="selectedChannels" 
              :id="`channel-${index}`"
              class="channel-checkbox"
            >
            <label :for="`channel-${index}`" class="channel-label d-flex align-items-center">
              <img :src="channel.profilePic" alt="" class="profile-pic me-1" style="width: 40px; height: 40px; border-radius: 50%;">
              <div>
                <span>{{ channel.name }}</span>
                <span class="subscribers">{{ channel.subscribers }} subscribers</span>
              </div>
              <span class="dot" :style="{ backgroundColor: channel.color }"></span>
            </label>
          </div>
        </div>
          <div class="button-container d-flex justify-content-between">
            <button @click="selectAllChannels" class="btn btn-custom">Select All</button>
            <button @click="deselectAllChannels" class="btn btn-custom">Deselect All</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Lower Row -->
    <div class="row">
      <!-- This Month Earnings Column -->
      <div class="col-md-6">
        <h3>Monthly Earnings Breakdown</h3>
        <p>Total: ${{ totalEarnings }}</p>
        <canvas ref="monthlyEarningsChart" id="monthlyEarningsChart" width="400" height="200"></canvas>
        <p>Percentage increase: {{ percentageIncrease }}%</p>
      </div>
      <!-- History Column -->
      <div class="col-md-6 history-list">
        <div class="row">
          <div class="col-auto">
            <h3>History</h3>
          </div>
          <div class="col text-end">
            <div class="dropdown">
              <button class="btn btn-custom dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter History
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click.prevent="selectedFilter = 'All'">All</a>
                <a class="dropdown-item" href="#" @click.prevent="selectedFilter = 'Earnings'">Earnings</a>
                <a class="dropdown-item" href="#" @click.prevent="selectedFilter = 'Payment'">Payment</a>
              </div>
            </div>
          </div>
            <!--
            <div class="dropdown">
              <button class="btn btn-custom dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Date Range
              </button>
              <div class="dropdown-menu p-4" aria-labelledby="dropdownMenuButton">
                <div class="form-group">
                  <label for="startDate">Start Date:</label>
                  <input type="date" id="startDate" class="form-control" v-model="startDate">
                </div>
                <div class="form-group">
                  <label for="endDate">End Date:</label>
                  <input type="date" id="endDate" class="form-control" v-model="endDate">
                </div>
                <button class="btn btn-primary" @click="filterHistoryByDate">Apply</button>
              </div>
            </div>
          </div>
          -->
          <!--
          <div class="col text-end">
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
        -->
        </div>
        <div v-for="(item, index) in filteredHistory" :key="index" class="history-item">
          <div class="history-content">
            <span>{{ item.name }}</span>
            <span>{{ item.date }}</span>
            <span :class="{'text-positive': item.amount > 0, 'text-negative': item.amount < 0}">
              {{ item.amount > 0 ? '+' : '' }}${{ item.amount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);
//import 'vue-datepicker-ui/lib/vuedatepickerui.css';
//import VueDatepickerUi from 'vue-datepicker-ui';
//import { createPopper } from '@popperjs/core';

export default {
  name: "FinanceInfo",
  components: {
    //Datepicker: VueDatepickerUi
  },
  data() {
    return {
      selectedCategory: 'All',
      //monthlyEarningsChartInstance: null,
      selectedFilter: 'All',
      selectedChannels: [],
      channels: [
        { name: 'Marques Brownlee', subscribers: '6M', profilePic: '/assets/Marques Brownlee.jpg',color: '#FF0000'},
        { name: 'Mr Beast - Jimmy', subscribers: '16M', profilePic: '/assets/Mr Beast.jpg',color: '#FFC107'},
        { name: 'Ms Yeah 办公室小野', subscribers: '636K', profilePic: '/assets/Ms Yeah.jpg',color: '#EEABD1' },
        { name: "Whindersson Nunes", subscribers: "1M",profilePic: '/assets/Whindersson Nunes.jpeg',color: '#28A745' },
        { name: "HolaSoyGerman", subscribers: "2M",profilePic: '/assets/HolaSoyGerman.jpg',color: '#AACCFF' },
        { name: "Liza Koshy", subscribers: "332K",profilePic: '/assets/Liza Koshy.jpg',color: '#EAEAEA' }
        // Add other channels here
      ],
      totalEarnings: 2000,
      percentageIncrease: 15,
      history: [
        { name: 'Earnings YouTube Channel', date: '2022-01-01', amount: 200 },
        { name: 'Payment Regular', date: '2022-01-02', amount: -300 },
        { name: 'Earnings YouTube Recruiter', date: '2022-01-03', amount: 500 },
        { name: 'Earnings YouTube Channel', date: '2022-01-03', amount: 700 },
        { name: 'Payment Regular', date: '2022-01-04', amount: -100 },
        { name: 'Earnings YouTube Channel', date: '2022-01-04', amount: 900 },
        { name: 'Payment Regular', date: '2022-01-06', amount: -150 }
        // Add other history items here
      ],
      colors: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(40, 159, 64, 1)',
        'rgba(210, 45, 53, 1)',
      ],
      earningsData: {
        'Marques Brownlee': [0, 100, 50, 150, 230, 210, 280],
        'Mr Beast - Jimmy': [100, 200, 130, 180, 270, 290, 260],
        'Ms Yeah 办公室小野': [250, 180, 150, 250, 230, 310, 290],
        'Whindersson Nunes': [130, 100, 250, 150, 270, 280, 320],
        'HolaSoyGerman': [200, 150, 180, 310, 210, 300, 360],
        'Liza Koshy': [120, 220, 230, 180, 170, 290, 160]
      },
      isDropdownOpen: false
    };
  },
  created() {
    this.selectAllChannels();
  }, 
  computed: {
    ...mapState(['analyticsData']),

    uniqueCategories() {
      // Extracts all names from the history array and then filters out duplicates
      const names = this.history.map(item => item.name);
      return Array.from(new Set(names)); // Convert Set back to Array to get unique values
    },
    filteredHistory() {
    if (this.selectedFilter === 'All') {
      return this.history;
    }
    return this.history.filter(item => item.name.includes(this.selectedFilter));
    },
  },
  mounted() {
        this.$nextTick(() => {
            // Debugging: Log to see if this runs after DOM updates
            console.log("mounted() and $nextTick(): ", this.$refs.earningsChart, this.$refs.monthlyEarningsChart);

            // Ensure elements are present before attempting to access them
            if (this.$refs.earningsChart && this.$refs.monthlyEarningsChart) {
                const ctxEarnings = this.$refs.earningsChart.getContext('2d');
                const ctxMonthlyEarnings = this.$refs.monthlyEarningsChart.getContext('2d');
                
                // Now safe to proceed with chart initialization
                this.renderEarningsChart(ctxEarnings); // Pass the context to your method if needed
                this.renderMonthlyEarningsChart(ctxMonthlyEarnings); // Adjust method to accept context
            } else {
                console.error("One or both canvas elements not found");
            }
        });
    },
  beforeUnmount() {
    if (this.monthlyEarningsChartInstance) {
      this.monthlyEarningsChartInstance.destroy();
    }
  },
  methods: {
    goToVideoPage() {
      this.$router.push({ name: 'home-video' });
    },
    selectAllChannels() {
      this.selectedChannels = this.channels.map(channel => channel);
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
      if (!this.$refs.earningsChart) {
        console.error('Earnings chart canvas element not found');
        return;
      }
      const ctx = this.$refs.earningsChart.getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: this.selectedChannels.map(channel => { // Removed 'index' from here
            return {
              label: channel.name,
              data: this.earningsData[channel.name],
              borderColor: channel.color,
              backgroundColor: this.getTransparentColor(channel.color),
              borderWidth: 2
            };
          })
        }
      });
    },
    getRandomColor() {
      // This is a placeholder function. You should replace it with actual logic to generate random colors.
      return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
    },
    getTransparentColor(color) {
      // This is a placeholder function. You should replace it with actual logic to convert colors to their transparent equivalents.
      return color.replace('1)', '0.2)');
    },
    getColor(index) {
      const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#6610f2']; // Example colors
      return colors[index % colors.length];
    },
    renderMonthlyEarningsChart() {
      if (!this.analyticsData || !this.analyticsData.rows || !this.$refs.monthlyEarningsChart) {
        console.error("Required conditions not met for rendering monthly earnings chart.");
        return;
      }

      const ctx = this.$refs.monthlyEarningsChart.getContext('2d');

      const labels = this.analyticsData.rows.map(row => row[0]);
      const datasets = this.analyticsData.columnHeaders.slice(1).map((header, index) => {
        return {
          label: header.name,
          data: this.analyticsData.rows.map(row => row[index + 1]),
          borderColor: this.colors[index % this.colors.length],
          fill: false, // Ensure the area under the line isn't filled
        };
      });

      if (this.monthlyEarningsChartInstance) {
        this.monthlyEarningsChartInstance.destroy();
      }

      this.monthlyEarningsChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    
  },
},
// For the watcher example, if you're not using newVal or oldVal, just omit them
watch: {
  selectedChannels: {
    handler() {
      this.renderEarningsChart();
      //this.renderMonthlyEarningsChart();
    },
    deep: true
  },
  analyticsData: {
    handler() {
      if (this.analyticsData && this.analyticsData.rows) {
        this.renderMonthlyEarningsChart();
      }
    },
    deep: true,
    immediate: true
  }
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
  background: rgba(18, 52, 86, 0.0); /* Replace with the gradient you want */
  padding: 10px 0; /* Add padding as necessary */
  color: #FFFFFF; /* Replace with the color of your text */
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

  .nav_link {
  text-decoration: none;
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
    color: #4CAF50;
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
  padding: 9px; /* Adjust padding to your preference */
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
    color: white !important; /* Text color */
    border: 1px solid white !important; /* White border */
    margin: 5px 0; /* Margin for spacing */
  }

  .btn-custom:hover {
    background-color: #F0F0F0; /* Grey background on hover */
    color: #000000 !important; /* Change text color as needed */
  }

  .form-control {
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  }

  /* Adjust the button container to make the buttons align nicely */
  .d-flex.justify-content-center {
    flex-direction: column; /* Stack buttons vertically */
    align-items: stretch; /* Stretch buttons to fill the width */
  }

</style>
<style src="../../css/style.css"></style>
