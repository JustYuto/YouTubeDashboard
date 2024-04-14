<template>
  <div
    class="w-auto collapse navbar-collapse max-height-vh-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" :class="{ 'active': $route.name === 'Dashboard' }">
        <sidenav-collapse navText="Home" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="{ 'active': $route.name === 'Videos' }">
        <sidenav-collapse navText="Videos" :to="{ name: 'Videos' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="{ 'active': $route.name === 'Finances' }">
        <sidenav-collapse navText="Finances" :to="{ name: 'Finances' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" :class="{ 'active': $route.name === 'Settings' }">
        <sidenav-collapse
          navText="Settings"
          :to="{ name: 'Settings' }"
        >
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="{ 'active': $route.name === 'Deals' }">
        <sidenav-collapse navText="Partner Deals" :to="{ name: 'Deals' }">
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
      <li class="nav-item" :class="{ 'active': $route.name === 'Assets' }">
        <sidenav-collapse navText="Assets" :to="{ name: 'Assets' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="{ 'active': $route.name === 'Comments' }">
        <sidenav-collapse navText="Comments" :to="{ name: 'Comments' }">
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
    <div class="nav-item d-flex align-items-center">
            <router-link
              :to="{ name: '/' }"
              class="px-0 nav-link font-weight-bold"
              :class="textWhite ? textWhite : 'text-body'"
            >
              
              <div v-if="this.$store.state.isAuthenticated" class="d-flex flex-column gap-2 align-items-center"
                >
            
                <soft-avatar
                      :img="`${ this.$store.state.user.personalData.picture}`"
                      size="sm"
                      border-radius="lg"
                      alt="user1"
                    />
{{ this.$store.state.user.personalData.firstName }}
                </div
              >
              <span v-else class="d-sm-inline d-none">
                <i
                class="fa fa-user"
                :class="this.$store.state.isAuthenticated ? 'ms-sm-2' : 'me-sm-1'"
              ></i>
              Sign In</span>
            </router-link>
          </div>
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
// import SoftAvatar from "@/components/SoftAvatar.vue";

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
    // SoftAvatar,
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

.nav-link.active {
  border: none;
}

.active {
  border-right: 2px solid white;
}

.navbar-vertical.navbar-expand-xs .navbar-collapse {
  height: calc(100vh - 260px) !important;
}
</style>