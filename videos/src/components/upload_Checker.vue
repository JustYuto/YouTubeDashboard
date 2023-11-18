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
            <a href="#" class="nav_link active">
              <i class="bx bx-grid-alt nav_icon"></i>
              <span class="nav_name">Home</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-user nav_icon"></i>
              <span class="nav_name">Videos</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-message-square-detail nav_icon"></i>
              <span class="nav_name">Finances</span>
            </a>
            <a href="#" class="nav_link">
              <i class="bx bx-bookmark nav_icon"></i>
              <span class="nav_name">Settings</span>
            </a>
            <a href="#" class="nav_link">
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
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="gradient"></div>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">Videos</a>
        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">To Fix</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ignored</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">All Videos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

  <div id="fh5co-footer" role="contentinfo">
    <div class="container">
      <div class="row">
        <div class="col-md-4 to-animate">
          <p class="video-list"></p>
          <h3 class="section-title">The New iPad is Weird!</h3>
          <p>Marques Brownlee</p>
          <p>323K views・23 Oct 2022</p>
        </div>

        <div class="col-md-4 to-animate">
          <p class="video-list"></p>
          <h3 class="section-title">The New iPad is Weird!</h3>
          <p>Marques Brownlee</p>
          <p>323K views・23 Oct 2022</p>
        </div>
        <div class="col-md-4 to-animate">
          <p class="video-list"></p>
          <h3 class="section-title">The New iPad is Weird!</h3>
          <p>Marques Brownlee</p>
          <p>323K views・23 Oct 2022</p>
        </div>
        <div class="col-md-4 to-animate">
          <p class="video-list"></p>
          <h3 class="section-title">The New iPad is Weird!</h3>
          <p>Marques Brownlee</p>
          <p>323K views・23 Oct 2022</p>
        </div>
        <div class="col-md-4 to-animate">
          <p class="video-list"></p>
          <h3 class="section-title">The New iPad is Weird!</h3>
          <p>Marques Brownlee</p>
          <p>323K views・23 Oct 2022</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>
<style src="../../css/style.css"></style>
