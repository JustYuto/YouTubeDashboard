<template>
  <div class="container-fluid py-7">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 mb-3">
            <div class="nav-tabs-navigation">
              <div class="nav-tabs-wrapper">
                <ul class="nav nav-tabs" data-tabs="tabs">
                  <li class="nav-item">
                    <a class="nav-link active text-white" href="#personal" data-toggle="tab">Personal Details</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active text-white" href="#social" data-toggle="tab">Social Profiles</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active text-white" href="#channels" data-toggle="tab">Channels</a>
                  </li>
                  <!-- ... other tab links ... -->
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="tab-content">
              <div class="tab-pane active" id="personal">

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" class="form-control" placeholder="First Name" value="Josh">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Last Name</label>
                      <input type="text" class="form-control" placeholder="Last Name" value="Mayers">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" class="form-control" placeholder="Email" value="name@address.com">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input type="text" class="form-control" placeholder="+40 234 543 123">
                    </div>
                  </div>
                </div>
              </div>
              <!-- ... other fields ... -->
              <div class="tab-pane active" id="social">

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Twitter</label>
                      <input type="url" class="form-control" placeholder="Profile URL">
                    </div>
                    <div class="form-group">
                      <label>Facebook</label>
                      <input type="url" class="form-control" placeholder="Profile URL">
                    </div>
                    <div class="form-group">
                      <label>Instagram</label>
                      <input type="url" class="form-control" placeholder="Profile URL">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>TikTok</label>
                      <input type="url" class="form-control" placeholder="Profile URL">
                    </div>
                    <div class="form-group">
                      <label>Discord</label>
                      <input type="text" class="form-control" placeholder="Server">
                      <input type="text" class="form-control mt-2" placeholder="Username">
                    </div>
                    <!-- ... other social input fields ... -->
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="channels">
                <div class="row">
                  <!-- Channel Card Example -->
                  <div class="col-lg-4 col-md-6">
                    <div class="card">
                      <img class="card-img-top" src="/youtubedashboard/src/assets/logo.png" alt="Channel Name">
                      <div class="card-body">
                        <h5 class="card-title">{{ this.$store.state.youtubeChannels.snippet.description }}</h5>
                        <p class="card-text">9M Subscriptions</p>
                        <a href="#" class="btn btn-primary">Linked</a>
                      </div>
                    </div>
                  </div>
                  <!-- ... other channels ... -->
                  <div class="col-12">
                    <button class="btn btn-primary">Add Channel</button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <button type="submit" class="btn btn-primary">Save</button>
                  <button type="button" class="btn btn-danger">Cancel</button>
                </div>
              </div>
            <!-- ... other tab panes ... -->
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "ProfileOverview",
  components: {
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      faFacebook,
      faTwitter,
      faInstagram,
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
