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
    <meta
      name="google-signin-client_id"
      content="913800804553-vlamv4rntbae79gc9n86e0mdt5vh9qfa.apps.googleusercontent.com"
    />
  </head>
  <header role="banner" id="fh5co-header" :style="{ filter: blurStyle }">
    <div class="l-navbar" id="nav-bar">
      <nav class="nav">
        <div>
          <div class="nav_list">
            <a href="#" class="nav_link active">
              <img
                src="@/assets/webtvasia logo.png"
                alt="Logo"
                class="logo-small"
              />
            </a>
            <a href="/" class="nav_link active">
              <i class="bx bx-grid-alt nav_icon"></i>
              <span class="nav_name">Home</span>
            </a>
            <a href="/video_HomePage" class="nav_link">
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
            <a href="/user_login" class="nav_link">
              <i class="bx bx-bar-chart-alt-2 nav_icon logout-bt"></i>
              <span class="nav_name">Log out</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="gradient"></div>
  <div class="container" :style="{ filter: blurStyle }">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand">Fix Video Details</a>
        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button type="button" class="btn-save btn-wide" @click="saveData">
                Save
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                class="btn-cancel btn-wide"
                @click="cancelEditing"
              >
                Cancel
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div v-if="isSaveSuccess" class="save-success-popup">
    <div class="save-success-content">
      <p class="save-success-message">Saved successfully!</p>
      <button type="button" class="btn" @click="closeSaveSuccessPopup">
        Close
      </button>
    </div>
  </div>
  <div v-if="isDiscardChanges" class="discard-changes-popup">
    <div class="discard-changes-content">
      <p class="discard-changes-message">Unsaved changes</p>
      <p>
        This video has unsaved changes. Are you sure you want to discard them?
      </p>
      <div>
        <button
          type="button"
          class="btn btn-wide btn-cancel"
          @click="keepEditing"
        >
          Keep Editing
        </button>
        <button
          type="button"
          class="btn btn-wide btn-light"
          @click="discardChanges"
        >
          Discard
        </button>
      </div>
    </div>
  </div>

  <div id="fh5co-footer" role="contentinfo" :style="{ filter: blurStyle }">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form>
            <div class="form-group position-relative" ref="popupAnchor">
              <label for="title">Title:</label>
              <input
                type="text"
                class="form-control"
                v-model="videoDetails.title"
                @input="checkTitleLength"
              />
              <p class="text-muted small position-absolute" style="right: 0">
                {{ videoDetails.title.length }}/100
              </p>
              <div v-if="isTitleTooShort" class="popover-custom">
                <div class="arrow"></div>
                <div>
                  <strong>Title is too short:</strong><br />
                  It is recommended that your titles are between 20 and 70
                  characters. This prevents truncation whilst giving more
                  metadata to rank with.
                </div>
                <div class="mt-2">
                  <button type="button" class="btn" @click="recheckTitle">
                    Recheck
                  </button>
                  <button
                    type="button"
                    class="btn"
                    @click="closeTitleVolumePopup"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group position-relative">
              <label for="tags">Tags:</label>
              <input
                id="tags"
                type="text"
                class="form-control"
                v-model="videoDetails.tags"
                @input="updateTags"
                @focus="checkTagVolume"
                style="height: 4em; word-wrap: break-word"
              />
              <p class="text-muted small position-absolute" style="right: 0">
                {{ tagsCharacterCount }}/300
              </p>
              <div v-if="isTagVolumeTooShort" class="popover-custom">
                <div class="arrow"></div>
                <div>
                  <strong>Tag Volume is too short:</strong><br />
                  It is recommended that your total tag volume is at least 100
                  characters. This gives you more chance of ranking in search
                  and more chance for youtube to present your video in
                  discovery.
                </div>
                <div class="mt-2">
                  <button type="button" class="btn" @click="recheckTagVolume">
                    Recheck
                  </button>
                  <button
                    type="button"
                    class="btn"
                    @click="closeTagVolumePopup"
                  >
                    Ignore
                  </button>
                </div>
              </div>
              <!-- Display Tags -->
              <div class="mt-2">
                <span v-for="tag in videoDetails.tagsArray" :key="tag">
                  <span class="badge badge-secondary mr-1">{{ tag }}</span>
                </span>
              </div>
            </div>
            <div class="form-group position-relative">
              <label for="description">Description:</label>
              <textarea
                id="description"
                class="form-control"
                v-model="videoDetails.description"
                style="height: 6em; word-wrap: break-word"
              ></textarea>
              <p class="text-muted small position-absolute" style="right: 0">
                {{ videoDetails.description.length }}/5000
              </p>
            </div>
          </form>
        </div>

        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <img
              :src="videoDetails.thumbnail"
              alt="Thumbnail"
              style="height: 200px; cursor: pointer"
            />
            <div class="ml-2">
              <h3 class="section-title">{{ videoDetails.title }}</h3>
              <p>
                {{ new Date(videoDetails.date).toLocaleDateString() }}
              </p>
              <div class="d-flex align-items-center">
                <img
                  :src="channelProfileUrl"
                  alt="Channel Profile"
                  style="
                    height: 30px;
                    width: 30px;
                    cursor: pointer;
                    border-radius: 50%;
                  "
                />
                <div class="ml-2">
                  <h5>{{ videoDetails.channelTitle }}</h5>
                </div>
              </div>
              <div class="mt-3">
                <p>
                  {{
                    videoDetails.description.length > 100
                      ? videoDetails.description.substring(0, 100) + "..."
                      : videoDetails.description
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="content-tips-header">
          <h2 class="navbar-brand">Content Tips</h2>
          <div class="video-display">
            <div class="video-card">
              <iframe
                width="400"
                height="300"
                src="https://www.youtube.com/embed/pgrMDBEbjQE?si=qcwl-23JNrFADUg7"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="video-card">
              <iframe
                width="400"
                height="300"
                src="https://www.youtube.com/embed/9DEeMG_Gidw?si=_1hDjON4nGcpyeG3"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div class="video-card">
              <iframe
                width="400"
                height="300"
                src="https://www.youtube.com/embed/hoRbf6QC4eA?si=HaatTmwKPOHsFCDW"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import axios from "axios";
export default {
  name: "FixVideoPage",
  data() {
    return {
      videoDetails: {
        title: "",
        tags: [],
        description: "",
        thumbnail: "",
        channelTitle: "",
        channelId: "",
        date: "",
      },
      channelProfileUrl: "",
      isTagVolumeTooShort: false,
      isSaveSuccess: false,
      isDiscardChanges: false,
    };
  },
  created() {
    const {
      title,
      tags,
      description,
      thumbnail,
      channelTitle,
      channelId,
      date,
    } = this.$route.query;
    this.videoDetails = {
      title,
      tags,
      description,
      thumbnail,
      channelTitle,
      channelId,
      date,
    };

    this.getChannelProfileUrl();
  },
  methods: {
    async getChannelProfileUrl() {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${this.videoDetails.channelId}&key=AIzaSyBuR7Xkx_wvsvEiFbwaj4eklNWGE0ih7XU`
        );

        if (response.data.items.length > 0) {
          this.channelProfileUrl =
            response.data.items[0].snippet.thumbnails.default.url;
        }
      } catch (error) {
        console.error("Error fetching channel profile:", error);
      }
    },
    updateTags() {
      this.videoDetails.tagsArray = this.videoDetails.tags
        ? this.videoDetails.tags.split(",").map((tag) => tag.trim())
        : [];
    },
    checkTitleLength() {
      this.isTitleTooShort = this.videoDetails.title.length < 20;
      console.log(this.videoDetails.title.length);
    },
    positionPopup() {
      const popupAnchor = this.$refs.popupAnchor;
      const popup = this.$refs.popup;

      if (popupAnchor && popup) {
        const anchorRect = popupAnchor.getBoundingClientRect();
        popup.style.top = `${anchorRect.bottom + window.scrollY + 5}px`;
        popup.style.left = `${anchorRect.left + window.scrollX}px`;
      }
    },
    recheckTitle() {
      if (this.videoDetails.title.length >= 100) {
        this.closeTitleVolumePopup();
      }
    },

    closeTitleVolumePopup() {
      this.isTitleTooShort = false;
      this.$forceUpdate();
    },

    checkTagVolume() {
      this.isTagVolumeTooShort = this.videoDetails.tags
        ? this.videoDetails.tags.length < 100
        : true;
    },

    recheckTagVolume() {
      if (this.tagsCharacterCount >= 100) {
        this.closeTagVolumePopup();
      }
    },

    closeTagVolumePopup() {
      this.isTagVolumeTooShort = false;
      this.$forceUpdate();
    },
    async saveData() {
      try {
        const serverEndpoint = "http://localhost:3000/updateVideo";

        const requestData = {
          videoId: this.videoDetails.videoId,
          title: this.videoDetails.title,
          description: this.videoDetails.description,
          accessToken: localStorage.getItem("youtubeAccessToken"),
        };

        console.log("requestData: ", requestData);
        const response = await axios.post(serverEndpoint, requestData);

        if (response.status === 200) {
          alert("Video updated successfully!");
        } else {
          console.error("Failed to update video:", response);
          alert("Failed to update video.");
        }
      } catch (error) {
        console.error("Error updating video:", error);
        alert("Error updating video.");
      }
    },

    closeSaveSuccessPopup() {
      this.isSaveSuccess = false;
    },

    cancelEditing() {
      this.isDiscardChanges = true;
    },

    showDiscardChangesPopup() {
      this.isDiscardChanges = true;
    },

    keepEditing() {
      this.isDiscardChanges = false;
    },

    discardChanges() {
      this.isDiscardChanges = false;
    },
  },
  mounted() {
    this.positionPopup();
    window.addEventListener("resize", this.positionPopup);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.positionPopup);
  },
  computed: {
    titleCharacterCount() {
      return this.videoDetails.title.length;
    },
    tagsCharacterCount() {
      return this.videoDetails.tags ? this.videoDetails.tags.length : 0;
    },
    descriptionCharacterCount() {
      return this.videoDetails.description.length;
    },
    blurStyle() {
      return this.isSaveSuccess || this.isDiscardChanges ? "blur(3px)" : "none";
    },
  },
};
</script>
    
  <style>
.save-success-popup,
.discard-changes-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #774ea2;
  color: white;
  padding: 100px;

  border-radius: 8px;
  text-align: center;
  filter: none;
}

.save-success-content,
.discard-changes-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.save-success-message,
.discard-changes-message {
  font-size: 18px;
  margin-bottom: 10px;
}

.discard-changes-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.video-display {
  display: flex;
  overflow: auto;
}

.video-card {
  flex: 0 0 250px;
  margin-right: 20px;
}
</style>
  
  <style src="../../css/style.css"></style>