<template>
  <div class="login">
    <div class="login-content">
      <div class="logo">
        <img src="/src/assets/images/X-logo-white.png" />
      </div>
      <form class="form" @submit.prevent="login">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              autocomplete="on"
              name="email"
              v-model="user.email"
              class="input"
              type="email"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              v-model="user.password"
              class="input"
              type="password"
              autocomplete="on"
              name="password"
              required
            />
          </div>
        </div>

        <button class="btn">
          Login
        </button>
        <div v-if="error.length > 0" class="error">{{ error }}</div>
        <div class="register">
          Forgot password? Click
          <router-link :to="{ name: 'forgot.index' }">here</router-link>
        </div>
      </form>
      <div class="register">
        Don't have an account? Sign up
        <router-link :to="{ name: 'register.index' }">here</router-link>
      </div>
      <div
        class="register what-is"
        @click.prevent="$store.dispatch('modal/setAbout', true)"
      >
        What is All to X?
      </div>
      <modal v-if="$store.state.modal.showAboutModal">
        <h3 slot="header">What is All to X?</h3>
        <div slot="body">
          <h5>
            All to X is a platform that brings the whole Aalto community
            together to celebrate the 10th anniversary of AYY.
          </h5>
          <p>
            Update your daily vibe and see how others are vibing. Find
            interesting events all in one place. Let’s celebrate the 10th
            anniversary All together!
          </p>
          <p>
            Collect points by being active in All to X! You get points for
            example from updating your vibe and attending events in the Event
            feed.
          </p>
          <p>
            But this is not all. By gaining points we can increase the amount
            our sponsor will donate to charity! The donations will go to “Eväitä
            Elämälle” (Fuel for Life) programme aimed to children at risk of
            social exclusion by Pelastakaa Lapset ry (Save the Children).
          </p>

          <p>
            This video demonstrates the features of this platform:
          </p>

          <video width="100%" height="300" controls>
            <source src="../assets/videos/app_video.mp4" type="video/mp4" />
          </video>

          <h5>Register now! &#128525;</h5>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import VDynamicBackground from '/src/components/DynamicBackground';
import Modal from '../components/Modal';

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
      user: {
        email: null,
        password: null,
      },
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
    login() {
      this.error = '';
      this.$store.dispatch('auth/login', this.user).catch(err => {
        if (err.response.status === 403) {
          this.error = 'Account not activated yet. Please check your email';
        } else {
          this.error = 'Invalid email or password';
        }
      });
    },
  },
  /**
   * The components the page can use.
   */
  components: {
    VDynamicBackground,
    Modal,
  },
};
</script>
