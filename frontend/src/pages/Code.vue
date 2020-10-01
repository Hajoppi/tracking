<template>
  <div class="home">
    <canvas class="login-content" ref="canvas"></canvas>
    <h1 style="font-size: 3rem">alltox.ayy.fi</h1>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import Proxy from '/src/proxies/Proxy';
export default {
  /**
   * The name of the page.
   */
  name: 'code-index',
  mounted() {
    this.updateQR();
    setInterval(this.updateQR, 1000);
  },
  methods: {
    updateQR() {
      const { eventId } = this.$route.params;
      if (!eventId) {
        return;
      }
      new Proxy('code').find(eventId).then(response => {
        const encodedResponse = encodeURIComponent(response);
        const link = `${eventId}-${encodedResponse}`;
        QRCode.toCanvas(this.$refs['canvas'], link, { scale: 10 });
      });
    },
  },
};
</script>
