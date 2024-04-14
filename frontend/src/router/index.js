import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Videos from "@/views/Videos.vue";
// import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Settings from "@/views/Settings.vue";
import Comments from "@/views/Comments.vue";
import Deals from "@/views/Deals.vue";
import Finances from "@/views/Finances.vue";
import Assets from "@/views/Assets.vue";
import VideoHomePage from "../components/video_HomePage.vue";
import FixVideoPage from "../components/fixVideoPage.vue";
import UserLogin from "../components/user_login.vue";
import FinanceInfo from "../components/finance_info.vue";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import LastNameView from "../views/LastNameView.vue";
import AuthCallbackView from "../views/AuthCallbackView.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "/",
  //   redirect: "/dashboard",
  // },
  {
    path: "/",
    name: "/",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/videos",
    name: "Videos",
    component: Videos,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/finances",
    name: "Finances",
    component: Finances,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/assets",
    name: "Assets",
    component: Assets,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/comments",
    name: "Comments",
    component: Comments,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignUp,
  },
  {
    path: "/deals",
    name: "Deals",
    component: Deals,
    meta: {
      requiresAuth: true,
    },
  },

  // { path: "/", component: UserLogin },
  { path: "/video_HomePage", name: "home-video", component: VideoHomePage },
  { path: "/fix-video/:videoId", name: "fix-video", component: FixVideoPage },
  { path: "/user_login", name: "user-login", component: UserLogin },
  { path: "/finance_info", name: "finance-info", component: FinanceInfo },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/lastname",
    name: "LastName",
    component: LastNameView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth/callback",
    name: "AuthCallback",
    component: AuthCallbackView, // This view will handle the callback
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem("token"); // Checks local storage directly

  if (requiresAuth && !isAuthenticated) {
    next("/sign-in"); // or the login route if you have one
  } else {
    next();
  }
});

export default router;
