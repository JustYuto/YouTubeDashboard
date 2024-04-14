<template>
    <div class="profile-view">
      <h1>Profile Page</h1>
      <p>Name: {{ userProfile.firstName }} {{ userProfile.lastName }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  /* eslint-disable */
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const router = useRouter();
  const userProfile = ref({ firstName: '', lastName: '' });
  
  // Fetch user profile data when the component is mounted
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile/me', {withCredentials: true});
      userProfile.value = response.data.user;
      store.dispatch('fetchChannels')
      // store.dispatch('fetchUser', localStorage.getItem("token"))
      console.log(userProfile.value)
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };
  
  fetchUserProfile();
  
  const logout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/google/logout', {withCredentials: true});
      store.dispatch('logout')
        .then(() => {
          router.push('/sign-in');
        });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  </script>
  
  <style scoped>
  .profile-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #357ae8;
  }
  </style>
  