<template>
  <div>
    <div
      v-if="isOpen"
      @click="() => closeSidebar((navigated = false))"
      class="overlay"
    ></div>
    <div class="sidebar" v-bind:class="{ isOpen }">
      <div class="empty-space-top"></div>
      <router-link class="sidebar-item" @click.native="closeSidebar()" to="/">
        Home
      </router-link>
      <router-link
        class="sidebar-item"
        @click.native="closeSidebar()"
        to="/events"
      >
        Events
      </router-link>
      <router-link
        class="sidebar-item"
        @click.native="closeSidebar()"
        to="/leaderboard"
      >
        Leaderboard
      </router-link>
      <router-link
        class="sidebar-item"
        @click.native="closeSidebar()"
        to="/aaltofiilis"
      >
        Aaltovibe
      </router-link>
      <router-link
        class="sidebar-item"
        @click.native="closeSidebar()"
        to="/about"
      >
        About
      </router-link>
      <router-link
        class="sidebar-item"
        @click.native="closeSidebar()"
        to="/quiz"
      >
        Quiz
      </router-link>
      <router-link
        class="sidebar-item"
        @click.native="closeSidebar()"
        to="/profile"
      >
        Profile
      </router-link>
      <div class="sidebar-item" @click="logout()">
        Logout
      </div>
      <div class="empty-space"></div>
      <router-link
        class="gdpr-link"
        @click.native="closeSidebar()"
        to="/gdpr-toc"
      >
        Terms &#38; Conditions,
        <br />
        Privacy Policy
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    closeSidebar: Function,
  },
  name: 'sidebar',
  methods: {
    logout() {
      this.closeSidebar();
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>
