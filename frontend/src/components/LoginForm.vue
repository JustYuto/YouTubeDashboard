<template>
    <div class="login-form">
      <button @click="loginWithGoogle">Login with Google</button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const store = useStore();
  const router = useRouter();
  
  // Function to toggle display settings
  const toggleEveryDisplay = () => {
    store.commit('toggleEveryDisplay');
  };
  
  // Using onMounted to mimic created()
  onMounted(() => {
    toggleEveryDisplay(); // Toggles display settings when the component is mounted
    checkLoginStatus();   // Check login status right after component mounts
  });
  
  // Using onBeforeUnmount to handle cleanup
  onBeforeUnmount(() => {
    toggleEveryDisplay(); // Optionally toggle display settings before the component is destroyed
  });
  
  const loginWithGoogle = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/google', { withCredentials: true });
      if (response.status === 200 && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Failed to initiate Google login.');
    }
  };
  
  // Function to check login status on mount
  async function checkLoginStatus() {
    try {
      const response = await axios.get('http://localhost:3000/api/session');
      if (response.data.isLoggedIn) {
        router.push('/profile'); // Redirect to profile if already logged in
      }
    } catch (error) {
      console.error('Session check failed:', error);
    }
  }
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
  