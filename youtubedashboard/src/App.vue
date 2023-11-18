<template>
  <div v-if="loggedIn">
    <button @click="logout">Logout</button>
    <h2>Name: {{ user.name }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <img :src="user.picture" />
  </div>
  <div v-else>
    <GoogleLogin :callback="callback" prompt />
  </div>
</template>

<script>
import { decodeCredential, googleLogout } from 'vue3-google-login'
export default {
  data() {
    return {
      loggedIn: false,
      user: null,

      callback: (response) => {
        console.log("logged in")
        this.loggedIn = true
        console.log(response)
        this.user = decodeCredential(response.credential)

      },
    }
  },
  methods: {
    logout() {
      googleLogout()
      this.loggedIn = false
      this.user = null
    },
  },
}
</script>

