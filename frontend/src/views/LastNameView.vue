<template>
    <div class="last-name-view">
      <h1>Last Name Page</h1>
      <p>Last Name: {{ userProfile.lastName }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  /* eslint-disable */
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const userProfile = ref({ lastName: '' });
  
  // Fetch user last name when the component is mounted
  const fetchLastName = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile/me', {withCredentials: true});
      userProfile.value.lastName = response.data.user.lastName;
    } catch (error) {
      console.error('Failed to fetch last name:', error);
    }
  };
  
  fetchLastName();
  
  const logout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/google/logout', {withCredentials: true});
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  </script>
  
  <style scoped>
  .last-name-view {
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
  
  p {
    font-size: 18px;
    color: #666;
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
  