<template>
  <head>
    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
  </head>
  <div id="app">
    <div class="row">
      <div class="col-md-6">
        <img src="@/assets/webtvasia logo.png" alt="Logo" class="logo-small" />
        <img src="@/assets/login image.jpg" alt="Display" class="img-fluid" />
      </div>

      <div class="col-md-6 right-content">
        <h1>Create your account!</h1>
        <div class="form-group">
          <input
            type="name"
            class="form-control"
            placeholder="Name"
            v-model="name"
            style="opacity: 0.7"
            required
          />
          <br />
          <input
            type="e_mail"
            class="form-control"
            placeholder="E-mail"
            v-model="e_mail"
            style="opacity: 0.7"
            required
          />
          <br />
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
            style="opacity: 0.7"
            required
          />
        </div>
        <div class="row">
          <button
            @click="createAccount"
            class="btn btn-primary col-sm-5 float-left"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      name: "",
      e_mail: "",
      password: "",
    };
  },
  methods: {
    createAccount() {
      if (!this.e_mail.includes("@")) {
        alert("Please enter a valid e-mail address.");
        return;
      }
      if (this.password.length < 5) {
        alert("Password must be at least 5 characters long.");
        return;
      }
      this.saveAccount();
    },
    async saveAccount() {},
  },
};
</script>

    
  <style>
.logo-small {
  max-width: 100px; /* Adjust the size as necessary */
  margin-top: 20px; /* Spacing from the top */
  margin-left: 20px; /* Spacing from the side */
}

.img-fluid {
  width: 100%; /* Full width of the column */
  border-radius: 5px; /* Optional: if you want rounded corners */
  margin: 10px; /* Space between logo and image */
  padding: 30px;
}

/* Styling for the form section */
.form-group input {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  color: #333;
}

.form-check {
  padding: 0;
  margin-top: -10px;
  margin-bottom: 10px;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 0px;
}

.float-left {
  margin-left: 0;
}

.float-right {
  margin-right: 0;
}

/* Customizations for buttons */
.btn-primary {
  background-color: #0056b3; /* Example primary color */
  border-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d; /* Example secondary color */
  border-color: #6c757d;
}

/* Spacing and alignment for the right-hand side content */
.right-content {
  padding: 40px 80px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .logo-small {
    margin-left: 10px; /* Less spacing on smaller screens */
  }

  .img-fluid {
    margin-top: 10px;
  }

  /* Stack columns vertically on smaller screens */
  .col-sm-6,
  .col-lg-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
  
  
  