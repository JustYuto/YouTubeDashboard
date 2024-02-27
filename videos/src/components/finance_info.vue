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
          <label v-for="(channel, index) in channels" :key="index" class="channel-checkbox">
            <input type="checkbox" :value="channel" v-model="selectedChannels">
            {{ channel.name }}
          </label>
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
      <div class="col-md-6">
        <h2>History</h2>
        <ul>
          <li v-for="(item, index) in history" :key="index">
            {{ item.date }} - {{ item.name }} - {{ item.amount > 0 ? '+' : '' }}${{ item.amount }}
          </li>
        </ul>
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
        { name: 'Marques Brownlee', subscribers: '6M' },
        // Add other channels here
      ],
      totalEarnings: 2000,
      percentageIncrease: 5,
      history: [
        { name: 'Video A', date: '2022-01-01', amount: 200 },
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
              data: [0, 10, 5, 2, 20, 30, 45],
              // Add other dataset properties here
            }
            // Add other datasets here
          ]
        }
      });
    },
    renderMonthlyEarningsChart() {
      const ctx = document.getElementById('monthlyEarningsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Monthly Earnings',
              data: [500, 600, 700, 2000],
              // Add other dataset properties here
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
    padding-left: 250px; /* Adjust this value based on the width of your sidebar */
  }

  /* Example media query for smaller screens */
  @media (max-width: 768px) {
    #main-container {
      padding-left: 100px; /* Smaller padding for smaller screens if the sidebar is also smaller */
    }
  }
</style>
<style src="../../css/style.css"></style>
