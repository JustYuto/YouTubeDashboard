<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <img src="path_to_your_logo.png" class="card-img-top" alt="WebTVAsia Logo">
            <div class="card-body">
              <h3 class="card-title text-center">Social Profiles</h3>
              <form @submit.prevent="submitSocialProfiles">
                <!-- Social Profiles Form -->
                <div class="mb-3">
                  <input type="url" class="form-control" placeholder="Twitter Profile URL" v-model="socialProfiles.twitter">
                </div>
                <!-- ... other social profile fields ... -->
  
                <!-- Permissions Checkbox -->
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="permissions" v-model="socialProfiles.grantedPermissions" required>
                  <label class="form-check-label" for="permissions">
                    I Grant Permission To WebTVAsia For YouTube Account Management, Analytics Access, And View Private Information During The Audit Process.
                  </label>
                </div>
  
                <!-- Navigation Buttons -->
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
                  <button type="submit" class="btn btn-primary">Apply</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        socialProfiles: {
          twitter: '',
          facebook: '',
          instagram: '',
          tiktok: '',
          discord: '',
          grantedPermissions: false
        }
      };
    },
    methods: {
      goBack() {
        // Logic to go back to the previous page
      },
      submitSocialProfiles() {
        // Logic to submit social profiles
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom CSS here */
  </style>
  