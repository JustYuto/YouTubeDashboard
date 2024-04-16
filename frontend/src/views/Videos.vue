<template>
    <div class="video-container">
      <div v-for="video in videos" :key="video.id" class="video-card">
        <img :src="video.snippet.thumbnails.high.url" :alt="video.snippet.title" />
        <h3 class="text-white font-weight-bolder mb-4 pt-2">{{ video.snippet.title }}</h3>
        <p>{{ video.snippet.description }}</p>
        <a :href="'https://www.youtube.com/watch?v=' + video.contentDetails.videoId" target="_blank">Watch Video</a>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        videos: []
      };
    },
    mounted() {
      this.fetchVideos();
    },
    methods: {
      fetchVideos() {
        axios.get('http://localhost:3000/api/youtube/videos/UUA9fJKX89e65JN-ASY4H3uQ')
          .then(response => {
            this.videos = response.data.items;
          })
          .catch(error => console.error('Error fetching videos:', error));
      }
    }
  }
  </script>
  
  <style>
  .video-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .video-card {
    width: 300px;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .video-card img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }

  .video-card h3 {
  font-size: 16px; /* Adjust the font size as needed */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0;
}

  .video-card p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px
}
  </style>