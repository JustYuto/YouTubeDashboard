<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <img src="path_to_your_logo.png" class="card-img-top" alt="WebTVAsia Logo">
            <div class="card-body">
              <h3 class="card-title text-center">Sign Up</h3>
              <form @submit.prevent="submitForm">
                <!-- Personal Details Form -->
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="First Name" v-model="user.firstName" required>
                </div>
                <!-- ... other personal detail fields ... -->
  
                <!-- Terms and Conditions -->
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="terms" v-model="user.agreedToTerms" required>
                  <label class="form-check-label" for="terms">I Accept The Terms And Conditions</label>
                </div>
  
                <!-- Navigation Buttons -->
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
                  <button type="submit" class="btn btn-primary">Next</button>
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
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          gender: '',
          birthDate: '',
          country: '',
          agreedToTerms: false
        }
      };
    },
    methods: {
      goBack() {
        // Logic to go back to the previous page
      },
      submitForm() {
        // Logic to submit form data
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom CSS here */
  </style>
  