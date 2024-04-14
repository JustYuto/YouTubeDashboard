<template>
    <div>
      <!-- Your component HTML goes here -->
      <h1>Login Processing...</h1>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const route = useRoute();
  const router = useRouter();
  const store = useStore();

  
  onMounted(() => {
    // Extract the code from the URL query parameter
    const token = route.query.token;
    console.log(token)
    if (token) {
      // Dispatch the login action from your Vuex store
      store.dispatch('fetchUser', token)
      store.dispatch('login', token)
        .then(() => {
          // Redirect to the profile or another target page on successful login
          router.push('/dashboard');
        })
        .catch((error) => {
          console.error('Login failed:', error);
          // Handle errors or redirect to a failure page
          router.push('/sign-in');
        });
    } else {
      // If no code is found in the query, redirect to login or error page
      router.push('/sign-in');
    }
  });
  </script>
  