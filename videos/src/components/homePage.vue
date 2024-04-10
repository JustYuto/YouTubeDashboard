<template>
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
  </head>
  <header role="banner" id="fh5co-header">
    <div class="l-navbar" id="nav-bar">
      <nav class="nav">
        <div>
          <div class="nav_list">
            <a href="/homePage" class="nav_link active">
              <i class="bx bx-grid-alt nav_icon"></i>
              <span class="nav_name">Home</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-user nav_icon"></i>
              <span class="nav_name">Videos</span>
            </a>
            <a href="/finance_info" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Finances</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Settings</span>
            </a>
            <a href="/backOfficePage" class="nav_link">
              <i class="bx bx-folder nav_icon"></i>
              <span class="nav_name">Partner Deals</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Assets</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Comments</span>
            </a>
            <a href="/user_login" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span class="nav_name">Log out</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="container">
    <h2>Unlink Request</h2>
    <form @submit.prevent="submitCancellationRequest">
      <button type="submit">Send</button>
    </form>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  methods: {
    submitCancellationRequest() {
      const userId = this.$store.state.userId;
      console.log(userId);
      axios
        .post(
          "http://localhost:3000/cancellation-requests",
          {
            user_id: userId,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // 成功した場合の処理
          console.log("解約依頼が成功しました", response);
        })
        .catch((error) => {
          // エラー処理
          console.error("解約依頼の送信に失敗しました", error);
        });
    },
  },
};
</script>