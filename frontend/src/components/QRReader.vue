<template>
  <div class="qr-reader">
    <maximize-icon v-if="!noIcon && !active" @click="capture"></maximize-icon>
    <div v-if="noIcon" @click="capture">
      <slot></slot>
    </div>
    <div v-if="active && hasGetUserMedia" class="wrapper">
      <h4 class="info-text">Scan a QR-code to get points!</h4>
      <video autoplay class="canvas" ref="video"></video>
      <x-circle-icon color="white" size="2.0x" @click="cancel"></x-circle-icon>
    </div>
    <canvas hidden ref="canvas"></canvas>
    <div v-if="active && !hasGetUserMedia" class="wrapper">
      <h4 v-if="!hasPermission" class="info-text">
        No permission to use camera
      </h4>
      <h4 class="info-text">
        Please enable permissions on your camera, or if you are on iPhone please
        use safari to use camera
      </h4>
      <x-circle-icon color="white" size="2.0x" @click="cancel"></x-circle-icon>
    </div>
    <div class="success" v-if="success">
      <h5>You have earned points!</h5>
      <h5>Go check out your profile for your total score.</h5>
    </div>
    <div v-if="error.length > 0" class="error">{{ error }}</div>
  </div>
</template>

<script>
import jsQR from 'jsqr';
import Proxy from '/src/proxies/Proxy';
import { MaximizeIcon, XCircleIcon } from 'vue-feather-icons';
export default {
  /**
   * The name of the page.
   */
  name: 'qr-reader',
  props: {
    noIcon: Boolean,
  },
  data() {
    return {
      error: '',
      active: false,
      success: false,
      hasPermission: true,
      tracks: [],
    };
  },
  computed: {
    hasGetUserMedia() {
      return !!(
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia &&
        this.hasPermission
      );
    },
  },
  methods: {
    cancel() {
      this.active = false;
      this.tracks.forEach(track => {
        track.stop();
      });
      const video = this.$refs.video;
      if (video !== undefined) {
        video.srcObject = null;
        video.src = null;
        video.pause();
      }
    },
    capture() {
      if (this.hasGetUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then(stream => {
            this.tracks = stream.getTracks();
            const video = this.$refs.video;
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            requestAnimationFrame(this.tick);
          })
          .catch(err => {
            this.hasPermission = false;
          });
      }
      this.active = true;
    },
    tick() {
      const video = this.$refs.video;
      if (
        !!video &&
        video.readyState === video.HAVE_ENOUGH_DATA &&
        this.active
      ) {
        const imageData = this.getImageData(video);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth',
        });
        this.checkCode(code);
      }
      if (this.active) {
        requestAnimationFrame(this.tick);
      }
    },
    getImageData(image) {
      const canvasElement = this.$refs.canvas;
      canvasElement.height = image.videoHeight || image.naturalHeight;
      canvasElement.width = image.videoWidth || image.naturalWidth;
      const canvas = canvasElement.getContext('2d', { alpha: false });
      canvas.imageSmoothingEnabled = false;
      canvas.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
      const imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      return imageData;
    },
    checkCode(code) {
      if (code) {
        this.cancel();
        const encoded = encodeURIComponent(code.data);
        new Proxy('validate')
          .find(encoded)
          .then(() => {
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 3000);
          })
          .catch(err => {
            const { response } = err;
            if (response.status === 409) {
              this.error = 'You have already used this code';
            } else if (response.status === 403) {
              switch (response.data) {
                case 'inactive':
                  this.error = 'Event is not active';
                  break;
                case 'invalid':
                  this.error = 'The code is invalid';
                  break;
                default:
                  this.error = 'Code is out of date. Please try again';
                  break;
              }
            }
            setTimeout(() => {
              this.error = '';
            }, 5000);
          });
        return;
      }
    },
  },
  components: {
    XCircleIcon,
    MaximizeIcon,
  },
};
</script>
