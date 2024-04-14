<template>
    <div class="login-form">
      <button @click="loginWithGoogle">Login with Google</button>
    </div>
  </template>
  
  <script setup>
  /* eslint-disable */
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  
  // Function to initiate login process
  const loginWithGoogle = async () => {

      // Request the backend to get the Google login URL
      window.location.href = 'http://localhost:3000/auth/google';
  };
  
  // Optionally check if already logged in when the component mounts
  onMounted(async () => {
    try {
      // Assuming you have an endpoint to check session status
      const response = await axios.get('http://localhost:3000/api/session', {
        withCredentials: true
      });
      if (response.data.isLoggedIn) {
        router.push('/profile'); // Redirect to profile if already logged in
      }
      else {
        console.log("User is not logged in")
      }
    } catch (error) {
      console.error('Session check failed:', error);
    }
  });
  </script>
  
  <style scoped>
  .login-form button {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  .login-form button:hover {
    background-color: #357ae8;
  }
  </style>
  