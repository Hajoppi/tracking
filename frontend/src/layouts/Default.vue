<template>
  <div class="layout">
    <nav-bar></nav-bar>
    <dynamic-background
      v-if="!$store.state.auth.authenticated && !$route.meta.hideBg"
    ></dynamic-background>
    <slot></slot>
    <aaltofiilis></aaltofiilis>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
import Aaltofiilis from '../components/AddAaltofiilis';
import DynamicBackground from '../components/DynamicBackground';
import Gdpr from '../pages/Gdpr';
import Modal from '../components/Modal';
/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages.
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */

export default {
  /**
   * The name of the layout.
   */
  name: 'default-layout',
  components: {
    NavBar,
    Aaltofiilis,
    DynamicBackground,
    Gdpr,
    Modal,
  },
  mounted() {
    if (this.$store.state.auth.authenticated) {
      this.$store.dispatch('account/find').then(() => {
        this.$store.dispatch(
          'modal/set',
          !this.$store.state.account.user.info_seen
        );
      });
    }
  },
};
</script>
