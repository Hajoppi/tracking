<template>
  <div class="login">
    <div class="login-content">
      <div class="logo">
        <img src="/src/assets/images/ayy10-white.png" />
      </div>
      <h4>
        To reset your password, please give your email address and we will send
        you a reset link.
      </h4>
      <div v-if="error.length > 0" class="error">{{ error }}</div>
      <form class="form" @submit.prevent="recover">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input v-model="email" class="input" type="email" required />
          </div>
        </div>
        <button :disabled="this.email.length === 0 || sent" class="btn">
          Recover
        </button>
      </form>
      <div v-if="info.length > 0" class="register">{{ info }}</div>
      <div class="register">
        Don't have an account? Sign up
        <router-link :to="{ name: 'register.index' }">here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login.
 */
export default {
  /**
   * The name of the page.
   */
  name: 'login-index',
  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      error: '',
      info: '',
      sent: false,
      email: '',
    };
  },
  /**
   * The methods the page can use.
   */
  methods: {
    /**
     * Will log the user in.
     *
     * @param {Object} user The user to be logged in.
     */
    recover() {
      this.error = '';
      this.sent = true;
      this.$store
        .dispatch('auth/recover', this.email)
        .then(() => {
          this.info = 'Please check your email for the recovery link';
        })
        .catch(() => {
          this.error = 'invalid email';
          this.sent = false;
        });
    },
  },
};
</script>
