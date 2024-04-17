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
              <img
                src="@/assets/webtvasia logo.png"
                alt="Logo"
                class="logo-small"
              />
            </a>
            <a href="/homePage" class="nav_link active">
              <i class="bx bx-grid-alt nav_icon"></i>
              <span class="nav_name">Home</span>
            </a>
            <a href="/video_HomePage" class="nav_link">
              <i class="bx bx-user nav_icon"></i>
              <span class="nav_name">Videos</span>
            </a>
            <a href="/finance_info" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Finances</span>
            </a>
            <a href="/analytics_info" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Analytics</span>
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
            <a href="#" class="nav_link" @click.prevent="logout">
              <i class="bx bx-log-out nav_icon"></i>
              <span class="nav_name">Logout</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
    <div class="container-fluid" id="main-container">
      <div class="row">
        <div class="row analytics-header">
          <div class="col-md-6">
            <h2>Top 10 City Analytics Overview</h2>
          </div>
          <div class="col-md-6">
            <h2>Gender Overview</h2>
          </div> 
        </div>
      </div>
      <!-- Upper Row -->
      <div class="row">
        <!-- City Chart Column -->
        <div class="col-md-6 canvas-container">
            <canvas ref="cityWatchChart" id="cityWatchChart" width="400" height="300"></canvas>
        </div>
        <!-- Gender Pie Column -->
        <div class="col-md-6 canvas-container">
            <canvas ref="genderPieChart" id="genderPieChart" width="400" height="300"></canvas>
        </div>
      </div>
      
      <!-- Lower Row -->
      <div class="row">
        <!-- This Month Earnings Column -->
        <div class="col-md-6 canvas-container">
          <h2>Subscribers by Country and Month</h2>
          <canvas ref="subscribersChart" id="subscribersChart" width="400" height="300"></canvas>
        </div>
        <!-- Age Pie Column -->
        <div class="col-md-6 canvas-container">
            <div class="d-flex justify-content-between align-items-center">
            <h2>Age Group Overview</h2>
            <button @click="resetCharts" class="btn btn-custom">Reset Charts</button>
        </div>
            <canvas ref="ageGroupPieChart" id="ageGroupPieChart" width="400" height="300"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import { Chart, PieController, ArcElement, BarController, BarElement, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
  Chart.register(PieController, ArcElement, BarController, BarElement, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

  
  export default {
    name: "AnalyticsInfo",
    components: {
      //Datepicker: VueDatepickerUi
    },
    data() {
      return {
        originalGenderData: {},
        originalAgeGroupData: {},
        genderData: {}, // Initialize as an empty object
        ageGroupData: {}, // Initialize this as well
        uniqueColors: new Set(),
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
      ...mapState({
        analyticsData2: state => state.analyticsData2
        }),
      ...mapState({
        analyticsData3: state => state.analyticsData3
        }),
      ...mapState({
        analyticsData4: state => state.analyticsData4
        }),
    },
    mounted() {
    this.prepareData();
    this.renderGenderPieChart();
    this.renderAgeGroupPieChart();
    this.renderSubscribersChart();
    this.$nextTick(() => {
        if (this.$refs.cityWatchChart) {
        const ctxCityWatch = this.$refs.cityWatchChart.getContext('2d');
        this.renderCityWatchChart(ctxCityWatch);
        } else {
        console.error("Canvas element for city watch chart not found");
        }
    });
    },
    beforeUnmount() {
      if (this.monthlyEarningsChartInstance) {
        this.monthlyEarningsChartInstance.destroy();
      }
    },
    methods: {
      logout() {
        localStorage.removeItem("userToken"); 
        this.$router.push({ name: 'user-login' }); 
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
      prepareData() {
        let genderData = { male: 0, female: 0 };
        let ageGroupData = {};

        this.analyticsData3.rows.forEach(row => {
        const [ageGroup, gender, viewerPercentage] = row;
        if (gender !== 'genderUserSpecified') {
            genderData[gender] = (genderData[gender] || 0) + viewerPercentage;
            if (ageGroupData[ageGroup]) {
            ageGroupData[ageGroup][gender] = (ageGroupData[ageGroup][gender] || 0) + viewerPercentage;
            } else {
            ageGroupData[ageGroup] = { [gender]: viewerPercentage };
            }
        }
        });

        this.originalGenderData = genderData;
        this.originalAgeGroupData = ageGroupData;
        this.genderData = genderData;
        this.ageGroupData = ageGroupData;
      },
      resetCharts() {
        this.genderData = { ...this.originalGenderData };
        this.ageGroupData = JSON.parse(JSON.stringify(this.originalAgeGroupData));
        this.renderGenderPieChart();
        this.renderAgeGroupPieChart();
      },
      renderCityWatchChart(ctx) {
        if (!this.analyticsData2 || !this.analyticsData2.rows) {
            console.error("Analytics data is not available");
            return;
        }

        // Create arrays for the data
        const labels = this.analyticsData2.rows.map(row => row[0]); // Cities
        const minutesWatchedData = this.analyticsData2.rows.map(row => row[1]); // Estimated Minutes Watched
        const averageViewDurationData = this.analyticsData2.rows.map(row => row[2]); // Average View Duration
        const viewsData = this.analyticsData2.rows.map(row => row[3]); // Views
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets:
                [{
                    label: 'Average View Duration',
                    data: averageViewDurationData,
                    type: 'line',
                    borderColor: 'rgba(153, 50, 204, 1)',
                    backgroundColor: 'rgba(153, 50, 204, 0.5)',
                    fill: false,
                    yAxisID: 'y1',
                    order: 1,
                },
                {
                    label: 'Estimated Minutes Watched',
                    data: minutesWatchedData,
                    backgroundColor: 'rgba(111, 205, 205, 0.8)',
                    borderColor: 'rgba(111, 205, 205, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                    order: 2,
                }, 
                {
                    label: 'Views',
                    data: viewsData,
                    type: 'line',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: false,
                    yAxisID: 'y2',
                },
            ]},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Minutes Watched'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Average View Duration (seconds)'
                        },
                        grid: {
                            drawOnChartArea: false // only draw grid lines for this axis
                        }
                    },
                    y2: { // Views
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Views'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    },
    renderGenderPieChart() {
    const ctx = this.$refs.genderPieChart.getContext('2d');
    if (this.genderPieChart) this.genderPieChart.destroy();  // Destroy existing chart instance if it exists
    this.genderPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.genderData),
        datasets: [{
          data: Object.values(this.genderData),
          backgroundColor: ['#36A2EB', '#FF6384'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'right' },
          tooltip: { enabled: true },
        },
        onClick: (evt, item) => {
          if (item.length > 0) {
            const selectedGender = item[0].index === 0 ? 'male' : 'female';
            this.filterCharts('gender', selectedGender);
          }
        }
      }
    });
  },
  renderAgeGroupPieChart() {
    const ctx = this.$refs.ageGroupPieChart.getContext('2d');
    if (this.ageGroupPieChart) this.ageGroupPieChart.destroy();  // Destroy existing chart instance if it exists
    this.ageGroupPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.ageGroupData),
        datasets: [{
          data: Object.values(this.ageGroupData).map(data => data.male + data.female),
          backgroundColor: this.colors.slice(0, Object.keys(this.ageGroupData).length),
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Maintains the aspect ratio
        aspectRatio: 1, // Ensures the pie chart is always round
        plugins: {
          legend: { display: true, position: 'right' },
          tooltip: { enabled: true },
        },
        onClick: (evt, item) => {
          if (item.length > 0) {
            const selectedAgeGroup = Object.keys(this.ageGroupData)[item[0].index];
            this.filterCharts('ageGroup', selectedAgeGroup);
          }
        }
      }
    });
  },
  filterCharts(filterType, filterValue) {
    // Logic to filter and update charts based on the selection
    if (filterType === 'gender') {
      // Filter age group chart based on selected gender
      const newAgeGroupData = {};
      Object.keys(this.ageGroupData).forEach(ageGroup => {
        newAgeGroupData[ageGroup] = this.ageGroupData[ageGroup][filterValue] || 0;
      });
      this.ageGroupPieChart.data.datasets[0].data = Object.values(newAgeGroupData);
      this.ageGroupPieChart.update();
    } else {
      // Filter gender chart based on selected age group
      const newGenderData = this.ageGroupData[filterValue];
      this.genderPieChart.data.datasets[0].data = [newGenderData.male, newGenderData.female];
      this.genderPieChart.update();
        }
    },
    renderSubscribersChart() {
        const ctx = this.$refs.subscribersChart.getContext('2d');
        // Filter out entries with zero subscribers gained and lost
        const data = this.analyticsData4.rows.filter(row => row[2] !== 0 || row[3] !== 0);
        const countries = [...new Set(data.map(item => item[1]))]; // Unique countries
        const months = [...new Set(data.map(item => item[0]))].sort(); // Unique months, sorted

        const datasets = [];

        countries.forEach(country => {
        const countryData = data.filter(item => item[1] === country);

        // Subscribers Gained
        datasets.push({
            label: `${country} Gained`,
            data: months.map(month => {
            const entry = countryData.find(item => item[0] === month);
            return entry ? entry[2] : 0;
            }),
            borderColor: this.getRandomColor(),
            fill: false,
            tension: 0.1 // Makes the line smooth
        });

        // Subscribers Lost
        datasets.push({
            label: `${country} Lost`,
            data: months.map(month => {
            const entry = countryData.find(item => item[0] === month);
            return entry ? entry[3] : 0;
            }),
            borderColor: this.getRandomColor(),
            borderDash: [5, 5], // Dashed line for losses
            fill: false,
            tension: 0.1 // Makes the line smooth
        });
        });

        if (this.subscribersChartInstance) {
        this.subscribersChartInstance.destroy();
        }

        this.subscribersChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels: months, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Subscribers'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(tooltipItem) {
                  if (tooltipItem.parsed.y !== 0) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.parsed.y} subscribers`;
                  }
                  return null;
                },
                labelColor: function(tooltipItem) {
                  return {
                    backgroundColor: tooltipItem.dataset.borderColor
                  };
                }
              }
            }
          }
        }
        });
      },   
      getRandomColor() {
      let color;
      do {
        color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`; 
      } while (this.uniqueColors.has(color));
        this.uniqueColors.add(color);
        return color;
      },
      getTransparentColor(color) {
        // This is a placeholder function. You should replace it with actual logic to convert colors to their transparent equivalents.
        return color.replace('1)', '0.2)');
      },
      getColor(index) {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#6610f2']; // Example colors
        return colors[index % colors.length];
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
      .canvas-container canvas {
        height: 300px !important;
      }
    }
    
    .canvas-container canvas {
    height: 400px !important; /* Fixed height */
    width: 100%; /*maintain responsiveness */
    }

    #cityWatchChart {
    height: 400px; /* Set a fixed height for the chart area */
    width: 100%; /* Ensure the chart takes full width */
    }
  
    .analytics-details p {
      margin: 0;
      font-size: 16px; /* Adjust font size as needed */
      line-height: 1.5; /* Adjust line height as needed */
    }
  
    .analytics-details strong {
      margin: 0;
      font-size: 19px; /* Adjust font size as needed */
      line-height: 1.5; /* Adjust line height as needed */
    }
  
    .nav_link {
    text-decoration: none;
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
  