<template>
  <div class="container-fluid px-7">
    <tabs>
      <tab name="Personal Data">
        <form @submit.prevent="submitPersonalData">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="First Name"
                  v-model="formData.personalData.firstName">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name"
                  v-model="formData.personalData.lastName">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Email" v-model="formData.personalData.email"
                  readonly>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Phone Number</label>
                <input type="text" class="form-control" placeholder="+40 234 543 123"
                  v-model="formData.personalData.phone">
              </div>
            </div>
          </div>
          <button type="submit" class="save">Save</button>
        </form>
      </tab>
      <tab name="Social Links">
        <form @submit.prevent="submitSocialLinks">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Twitter</label>
                <input type="url" class="form-control" placeholder="Profile URL"
                  v-model="formData.socialProfiles.twitter">
              </div>
              <div class="form-group">
                <label>Facebook</label>
                <input type="url" class="form-control" placeholder="Profile URL"
                  v-model="formData.socialProfiles.facebook">
              </div>
              <div class="form-group">
                <label>Instagram</label>
                <input type="url" class="form-control" placeholder="Profile URL"
                  v-model="formData.socialProfiles.instagram">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>TikTok</label>
                <input type="url" class="form-control" placeholder="Profile URL"
                  v-model="formData.socialProfiles.tiktok">
              </div>
              <div class="form-group">
                <label>Discord</label>
                <input type="text" class="form-control" placeholder="Server"
                  v-model="formData.socialProfiles.discord.server">
                <input type="text" class="form-control mt-2" placeholder="Username"
                  v-model="formData.socialProfiles.discord.username">
              </div>
              <!-- ... other social input fields ... -->
            </div>
          </div>
          <button type="submit" class="save">Save</button>
        </form>
      </tab>
      <tab name="Channels">
        <div class="row">
          <!-- Channel Card Example -->
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <img class="card-img-top" :src="this.$store.state.channels?.snippet?.thumbnails.high.url"
                alt="Channel Name">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <h5 class="card-title">{{ this.$store.state.channels?.snippet?.description }}</h5>
                <p class="card-text">{{ this.$store.state.channels?.statistics?.subscriberCount }} subscribers</p>
                </div>
                <a href="#" class="btn btn-primary" style="background-color: hsla(234, 100%, 69%, 1);">Linked</a>
              </div>
            </div>
          </div>
          <!-- ... other channels ... -->
          <!-- <div class="col-12">
            <button class="btn btn-primary">Add Channel</button>
          </div> -->
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue3-tabs-component';
import { mapState, mapActions } from 'vuex';
// import { mapState, mapActions } from 'vuex';
// import store from 'vuex';

// const channels = store.getters; 

// console.log(channels)

export default {
  name: "Billing",
  components: {
    Tab, Tabs
  },
  data() {
    return {
      formData: {
        personalData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: '',
          birthday: '',
          location: '',
          picture: '',
        },
        socialProfiles: {
          tiktok: '',
          twitter: '',
          facebook: '',
          instagram: '',
          discord: {
            server: '',
            username: ''
          }
        },
        youtubeChannels: [],
      }
    };
  },
  created() {
    this.initializeFormData();
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.formData.personalData = { ...newValue.personalData };
        this.formData.socialProfiles = { ...newValue.socialProfiles };
      }
    }
  },
  methods: {
    ...mapActions(['updatePersonalData', 'updateSocialLinks']),
    initializeFormData() {
      if (this.user) {
        this.formData.personalData = { ...this.user.personalData };
        this.formData.socialProfiles = { ...this.user.socialProfiles };
      }
    },
    submitPersonalData() {
      this.updatePersonalData(this.formData.personalData);
    },
    submitSocialLinks() {
      this.updateSocialLinks(this.formData.socialProfiles);
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
  }
};
</script>

<style>
.tabs-component-tabs {
  display: flex;
  gap: 30px;
  list-style: none;
  justify-content: flex-end;
  padding: 0 50px;
}

.card {
  height: 100%;
    overflow: hidden;
}

.save {
  background-color: white;
  height: 48px;
  border: none;
  width: 200px;
  border-radius: 6px;
  padding: 0px 24px !important;
}

.card .card-body {
  height: 100%;
}

.form-group input {
  background-color: hsla(234, 100%, 83%, 0.15) !important;
    
    border: none !important;
    height: 48px;
    border-radius: 4px !important;
    color: white !important;
}

.form-control:disabled, .form-control[readonly] {
  background-color: hsla(234, 100%, 83%, 0.15) !important;
    
    border: none !important;
    color: hsl(234deg 19.71% 51.37%) !important;
}
</style>
