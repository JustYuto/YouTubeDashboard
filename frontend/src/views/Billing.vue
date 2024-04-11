<template>
  <div class="container-fluid py-7">
    <tabs>
      <tab name="Personal Data">
        <form>
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
        </form>
      </tab>
      <tab name="Social Links">
        <form>
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
        </form>
      </tab>
      <tab name="Channels">
        <div class="row">
                  <!-- Channel Card Example -->
                  <div class="col-lg-4 col-md-6">
                    <div class="card">
                      <img class="card-img-top" src="/youtubedashboard/src/assets/logo.png" alt="Channel Name">
                      <div class="card-body">
                        <h5 class="card-title">Marques Brownlee</h5>
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
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue3-tabs-component';

export default {
  name: "Billing",
  components: {
    Tab, Tabs
  },
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

</style>
