<template>
  <div id="app">
    <router-link v-if="isHomePage" to="/video_HomePage">Home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isHomePage: false // set the initial value as per your logic
    };
  }
};
</script>

<style>
/* Add your global styles here */
</style>