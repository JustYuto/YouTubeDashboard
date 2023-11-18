import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const CLIENT_ID = '785497567658-16251n3ml1bu0mp440s4krbsi25obke7.apps.googleusercontent.com'

createApp(App)
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
    //scope: 'profile email',
    //prompt: 'select_account'
  })
.mount('#app');
