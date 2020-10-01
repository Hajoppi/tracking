<template>
  <div class="login">
    <div class="login-content activate">
      <div class="activate-msg">{{ message }}</div>
      <button v-if="email.length > 0 && !sent" @click="resend" class="btn">
        Resend Email
      </button>
    </div>
  </div>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

export default {
  /**
   * The name of the page.
   */
  name: 'home-index',
  data() {
    return {
      message: '',
      email: '',
      sent: false,
    };
  },
  mounted() {
    const route = this.$route;
    if (route.params.email) {
      this.email = route.params.email ? route.params.email : '';
    }
    const { hash } = this.$route.query;
    if (hash) {
      this.$store.dispatch('auth/activate', hash).catch(err => {
        const { status } = err.response;
        switch (status) {
          case 422:
            this.message = 'The code was invalid';
            break;
          case 403:
            this.message =
              'The code was out of date. Please sign up again and confirm your account within 24 hours of registration.';
        }
      });
    } else {
      this.message =
        'Thank you for registering to All to X! Confirm the registration by clicking the link sent to your email.';
    }
  },
  methods: {
    resend() {
      this.sent = true;
      this.$store.dispatch('auth/recover', this.email);
      setTimeout(() => (this.sent = false), 5000);
    },
  },
};
</script>
