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
    <!-- Upper Row -->
    <div class="row">
      <!-- Multiline Chart Column -->
      <div class="col-md-6">
        <canvas id="earningsChart"></canvas>
      </div>
      <!-- Multiselect Column -->
      <div class="col-md-6">
        <div class="multiselect-col">
          <div v-for="(channel, index) in channels" :key="index" class="mb-2 d-flex align-items-center">
            <input 
              type="checkbox" 
              :value="channel" 
              v-model="selectedChannels" 
              :id="`channel-${index}`"
              class="me-1"
            >
            <img :src="channel.profilePic" alt="" class="profile-pic me-1" style="width: 25px; height: 25px; border-radius: 50%;">
            <label :for="`channel-${index}`" :title="`Subscribers: ${channel.subscribers}`">{{ channel.name }}</label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Lower Row -->
    <div class="row">
      <!-- This Month Earnings Column -->
      <div class="col-md-6">
        <h2>This Month Earnings</h2>
        <p>Total: ${{ totalEarnings }}</p>
        <canvas id="monthlyEarningsChart"></canvas>
        <p>Percentage increase: {{ percentageIncrease }}%</p>
      </div>
      <!-- History Column -->
      <div class="col-md-6 history-list">
        <h2>History</h2>
        <div v-for="(item, index) in history" :key="index" class="history-item">
          <div class="history-content">
            <span>{{ item.date }}</span>
            <span>{{ item.name }}</span>
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
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  data() {
    return {
      selectedChannels: [],
      channels: [
        { name: 'Marques Brownlee', subscribers: '6M', profilePic: '/assets/Marques Brownlee.jpg' },
        { name: 'Mr Beast - Jimmy', subscribers: '16M', profilePic: '/assets/Mr Beast.jpg'},
        { name: 'Ms Yeah 办公室小野', subscribers: '63M', profilePic: '/assets/Ms Yeah.jpg' },
        { name: "Whindersson Nunes", subscribers: "1M",profilePic: '/assets/Whindersson Nunes.jpeg' },
        { name: "HolaSoyGerman", subscribers: "2M",profilePic: '/assets/HolaSoyGerman.jpg' },
        { name: "Liza Koshy", subscribers: "3M",profilePic: '/assets/Liza Koshy.jpg' }
        // Add other channels here
      ],
      totalEarnings: 2000,
      percentageIncrease: 5,
      history: [
        { name: 'Video A', date: '2022-01-01', amount: 200 },
        { name: 'Video B', date: '2022-01-02', amount: 300 },
        { name: 'Video C', date: '2022-01-01', amount: 500 },
        { name: 'Video D', date: '2022-01-03', amount: 700 },
        { name: 'Video E', date: '2022-01-01', amount: 100 },
        { name: 'Video F', date: '2022-01-04', amount: 900 }
        // Add other history items here
      ],
      earningsData: {
        // Populate with your earnings data
      }
    };
  },
  mounted() {
    this.renderEarningsChart();
    this.renderMonthlyEarningsChart();
  },
  methods: {
    renderEarningsChart() {
      const ctx = document.getElementById('earningsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Earnings',
              data: [0, 10, 5, 15, 23, 21, 28],
              borderColor: 'rgba(75,192,192,1)', // color of the line
              backgroundColor: 'rgba(75,192,192,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            },
            {
              label: 'Earnings',
              data: [10, 20, 13, 18, 27, 29, 26],
              borderColor: 'rgba(255,0,127,1)', // color of the line
              backgroundColor: 'rgba(255,0,127,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            },            
            {
              label: 'Earnings',
              data: [25, 18, 15, 25, 23, 31, 29],
              borderColor: 'rgba(0,255,127,1)', // color of the line
              backgroundColor: 'rgba(75,192,192,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            },
            {
              label: 'Earnings',
              data: [13, 10, 25, 15, 27, 28, 32],
              borderColor: 'rgba(255,255,0,1)', // color of the line
              backgroundColor: 'rgba(255,255,0,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            }
          ]
        }
      });
    },
    renderMonthlyEarningsChart() {
      const ctx = document.getElementById('monthlyEarningsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [
            {
              label: 'Monthly Earnings',
              data: [500, 700, 1200, 1500, 1300, 1800],
              borderColor: 'rgba(75,192,192,1)', // color of the line
              backgroundColor: 'rgba(75,192,192,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            },
            {
              label: 'Monthly Earnings',
              data: [1300, 900, 1500, 1700, 900, 1200],
              borderColor: 'rgba(255,0,127,1)', // color of the line
              backgroundColor: 'rgba(255,0,127,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            },
            {
              label: 'Monthly Earnings',
              data: [1500, 900, 1200, 1700, 1300, 1600],
              borderColor: 'rgba(0,255,127,1)', // color of the line
              backgroundColor: 'rgba(0,255,127,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            },
            {
              label: 'Monthly Earnings',
              data: [800, 1700, 2100, 1900, 2500, 2200],
              borderColor: 'rgba(255,255,0,1)', // color of the line
              backgroundColor: 'rgba(255,255,0,1)', // fill color under the line
              borderWidth: 2 // thickness of the line
            }
          ]
        }
      });
    }
  }
};
</script>

<style>
  #main-container {
    padding-top: 50px; /* Adjust this value based on the height of your navbar */
    padding-left: 350px; /* Adjust this value based on the width of your sidebar */
  }

  /* Example media query for smaller screens */
  @media (max-width: 768px) {
    #main-container {
      padding-left: 100px; /* Smaller padding for smaller screens if the sidebar is also smaller */
    }
  }
  .multiselect-col div {
    display: block;
  }

  .multiselect-col input[type="checkbox"] {
    vertical-align: middle;
    margin-right: 0.5rem; /* Adjust spacing between checkbox and label as needed */
  }

  .multiselect-col label {
    vertical-align: middle;
  }
  .history-list {
  padding: 0;
  }

  .history-item + .history-item {
    border-top: 1px solid #444; /* Or any color that suits your design */
  }

  .history-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .text-positive {
    color: green;
  }

  .text-negative {
    color: red;
  }

  .profile-pic {
    border-radius: 50%;
    width: 30px; /* Adjust as needed */
    height: 30px; /* Adjust as needed */
    object-fit: cover;
  }

</style>
<style src="../../css/style.css"></style>
