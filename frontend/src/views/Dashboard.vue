<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="adsense earnings"
          :value="{
            text: '53 432',
            dollar: true
          }"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="other earnings"
          :value="{
            text: '193 567',
            dollar: true
          }"
          :percentage="{
            value: '+3%',
            color: 'text-success',
          }"
          :icon="{
            component: ' ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <!-- this.$store.state.channels?.statistics?.viewCount -->
        <mini-statistics-card
          title="views"
          value="0" 
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <!-- this.$store.state.channels?.statistics?.subscriberCount -->
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="subscribers"
          value="0"
          :percentage="{
            value: '+5%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-cart',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body rounded-2xl p-3 bg-gradient-dark">
            <div class="row">
              <div class="col-lg">
                <div class="d-flex flex-column h-100 p-4">
                  <!-- <p class="mb-1 pt-2 text-bold">Built by developers</p> -->
                  <h2 class="font-weight-bolder">Take control Josh!</h2>
                  <p class="mb-5">
                    Use our content suggestions to improve your stats.
                  </p>
                  <a
                    class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                    href="javascript:;"
                  >
                    Fix Content
                    <i
                      class="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <!-- <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                <div class="bg-gradient-success border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                  />
                  <div
                    class="position-relative d-flex align-items-center justify-content-center h-100"
                  >
                    <img
                      class="w-100 position-relative z-index-2 pt-4"
                      src="../assets/img/illustrations/rocket-white.png"
                      alt="rocket"
                    />
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card h-100 p-3">
          <div
            class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
      
          >
            <span class=""></span>
            <div class="card-body position-relative z-index-1 p-3 h-100">
              <div class="d-flex flex-column h-100">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">
                  Consistency is key. It’s been the biggest driving factor of my channel in terms of growth.
                </h5>
                <!-- <p class="text-white mb-5">
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p> -->
                <li
                class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
              >
                <soft-avatar
                  class="me-3"
                  :img="sophie"
                  alt="kal"
                  border-radius="lg"
                  shadow="regular"
                />
                <div
                  class="d-flex align-items-start flex-column justify-content-center"
                >
                  <h6 class="mb-0 text-sm">Sophie B.</h6>
                  <p class="mb-0 text-xs">12.4M subscribers / avg. 3M views per video.</p>
                </div>
              </li>
                <!-- <a
                  class="text-white font-weight-bold ps-1 mb-0 icon-move-left mt-auto"
                  href="javascript:;"
                >
                  Read more
                  <i
                    class="fas fa-arrow-right text-sm ms-1"
                    aria-hidden="true"
                  ></i>
                </a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DemoApp/>
    <!-- <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart
              id="chart-bar"
              title="active Users"
              description="(<strong>+23%</strong>) than last week"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: {
                  label: 'Sales',
                  data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                },
              }"
              :items="[
                {
                  icon: {
                    color: 'primary',
                    component: faUsers,
                  },
                  label: 'users',
                  progress: { content: '37K', percentage: 60 },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: 'clicks',
                  progress: { content: '2m', percentage: 90 },
                },
                {
                  icon: { color: 'warning', component: faCreditCard },
                  label: 'Sales',
                  progress: { content: '435$', percentage: 30 },
                },
                {
                  icon: { color: 'danger', component: faScrewdriverWrench },
                  label: 'Items',
                  progress: { content: '43', percentage: 50 },
                },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
    
        <div class="card z-index-2">
          <gradient-line-chart
            id="chart-line"
            title="Gradient Line Chart"
            description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="{
              labels: [
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  label: 'Mobile Apps',
                  data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                },
                {
                  label: 'Websites',
                  data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                },
              ],
            }"
          />
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <timeline-list
          class="h-100"
          title="Orders overview"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>24%</span> this month"
        >
          <timeline-item
            color="success"
            icon="bell-55"
            title="$2400 Design changes"
            date-time="22 DEC 7:20 PM"
          />
          <TimelineItem
            color="danger"
            icon="html5"
            title="New order #1832412"
            date-time="21 DEC 11 PM"
          />
          <TimelineItem
            color="info"
            icon="cart"
            title="Server payments for April"
            date-time="21 DEC 9:34 PM"
          />
          <TimelineItem
            color="warning"
            icon="credit-card"
            title="New card added for order #4395133"
            date-time="20 DEC 2:20 AM"
          />
          <TimelineItem
            color="primary"
            icon="key-25"
            title="Unlock packages for development"
            date-time="18 DEC 4:54 AM"
          />
          <TimelineItem
            color="info"
            icon="check-bold"
            title="Notifications unread"
            date-time="15 DEC"
          />
        </timeline-list>
      </div>
    </div> -->
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import DemoApp from '@/examples/Calendar.vue'
import SoftAvatar from "@/components/SoftAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
// import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
// import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
// import TimelineList from "./components/TimelineList.vue";
// import TimelineItem from "./components/TimelineItem.vue";
// import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
// import axios from "axios";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";


//  // Fetch user profile data when the component is mounted
//  const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/youtube/channels', {withCredentials: true});
//       console.log(response)
//       // store.dispatch('fetchUser', localStorage.getItem("token"))
//     } catch (error) {
//       console.error('Failed to fetch user profile:', error);
//     }
//   };
  
//   fetchData();

export default {
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sophie,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    MiniStatisticsCard,
    SoftAvatar,
    DemoApp
    // ReportsBarChart,
    // GradientLineChart,
    // ProjectsCard,
    // TimelineList,
    // TimelineItem,
  },
};
</script>

<style>

.fc-h-event {
  border: 1px solid hsla(337, 75%, 59%, 1);
    padding: 8px 8px 8px 10px;
    background: transparent;
}

.fc .fc-daygrid-day.fc-day-today {
  background-color: rgba(229, 72, 132, 0.187);
  border-right: 1px solid white;
}

.fc .fc-button-primary {
  background: transparent;
    border-color: hsla(0, 0%, 100%, 0.4);
}

.fc .fc-button-primary:hover {
  background: hsla(337, 75%, 59%, 1);
}

.fc .fc-button:disabled {
  background: transparent;
  color: hsla(0, 0%, 100%, 1);
  border-color: hsla(0, 0%, 100%, 0.4);
}

.fc .fc-button-primary:not(:disabled).fc-button-active {
  background: hsla(337, 75%, 59%, 1);
  color: hsla(0, 0%, 100%, 1) !important;
  border-color: hsla(0, 0%, 100%, 0.4);
}

.card .card-body {
  display: flex;
    align-items: center;
}

</style>
