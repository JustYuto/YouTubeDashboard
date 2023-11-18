<template>
  <div id="app">
    <router-link v-if="isHomePage" to="/video_HomePage">Home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Add your global styles here */
</style>