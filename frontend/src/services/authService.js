import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/google'; // Base URL for authentication

export default {
  // Function to initiate the Google OAuth login process
  login() {
    // Redirect to the backend login route which handles Google OAuth
    window.location.href = `${API_URL}`;
  },

  // Function to handle the OAuth callback and retrieve session tokens
  handleAuthCallback(code) {
    return axios
      .post(`${API_URL}/callback`, { code })
      .then(response => {
        if (response.data.token) {
          // Store the token in localStorage or any other storage mechanism
          localStorage.setItem('token', response.data.token);
          return response.data;
        }
        throw new Error('Token not found in response');
      })
      .catch(error => {
        console.error('Error handling auth callback:', error);
        throw error;
      });
  },

  // Function to logout the user
  logout() {
    localStorage.removeItem('token'); // Remove the token from storage
    return axios
      .get(`${API_URL}/logout`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error logging out:', error);
        throw error;
      });
  }
};
