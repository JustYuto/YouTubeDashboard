<template>
    <div class="forgot-password">
      <h1>Forgot Password</h1>
      <p>Enter your email address to receive a password reset code.</p>
      <form @submit.prevent="sendCode">
        <label for="email">Email Address:</label>
        <input type="email" id="email" v-model="email" required>
        <button type="submit">Send Code</button>
      </form>
      <div v-if="showCodeInput">
        <p>Enter the code you received in your email.</p>
        <form @submit.prevent="resetPassword">
          <label for="code">Code:</label>
          <input type="text" id="code" v-model="code" required>
          <button type="submit">Reset Password</button>
        </form>
      </div>
      <div v-if="showSuccessMessage">
        <p>Your password has been reset successfully!</p>
        <a href="/login">Log In</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        code: '',
        showCodeInput: false,
        showSuccessMessage: false,
      };
    },
    methods: {
      sendCode() {
        // Send the code to the user's email address
        this.showCodeInput = true;
      },
      resetPassword() {
        // Reset the user's password
        this.showSuccessMessage = true;
      },
    },
  };
  </script>
  