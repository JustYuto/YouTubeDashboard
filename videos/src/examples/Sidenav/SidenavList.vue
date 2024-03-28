<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Home" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Videos" :to="{ name: '/' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Finances" :to="{ name: '/' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          navText="Settings"
          :to="{ name: '/' }"
        >
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Partner Deals" :to="{ name: '/' }">
          <template #icon>
            <settings />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          PAGES
        </h6>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse navText="Assets" :to="{ name: '/' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Comments" :to="{ name: '/' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Sign Up" :to="{ name: '/' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
  <!-- <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
      route="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
      label="Documentation"
      icon="ni ni-diamond"
    />
    <a
      class="btn bg-gradient-success mt-4 w-100"
      href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-pro?ref=vsud"
      type="button"
      >Upgrade to pro</a
    >
  </div> -->
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
import Box3d from "../../components/Icon/Box3d.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Document from "../../components/Icon/Document.vue";
// import Spaceship from "../../components/Icon/Spaceship.vue";
import Settings from "../../components/Icon/Settings.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "  Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    // SidenavCard,
    Shop,
    Office,
    CreditCard,
    Box3d,
    CustomerSupport,
    Document,
    // Spaceship,
    Settings,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>

<style>

.navbar-vertical .navbar-nav > .nav-item .nav-link.active .icon {
  background: none !important;
}

li.nav-item {
  margin: 0;
}
</style>