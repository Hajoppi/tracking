<template>
  <div
    class="navbar-container"
    v-if="$store.state.auth.authenticated && !this.$route.meta.hideNav"
  >
    <sidebar :isOpen="sidebarOpen" :closeSidebar="closeSidebar"></sidebar>
    <div class="navbar" :style="{ 'box-shadow': shadowStyle }">
      <div class="nav-items">
        <div class="toggle-button" @click="sidebarOpen = !sidebarOpen">
          <menu-icon size="1.5x"></menu-icon>
        </div>
        <div
          class="page-title"
          v-if="$store.state.modal.showReportPost !== null"
        >
          report post
        </div>
        <div class="page-title" v-else-if="$store.state.modal.showAddPost">
          New post
        </div>
        <div
          class="page-title"
          v-else-if="
            $router.currentRoute.meta && $router.currentRoute.meta.title
          "
        >
          {{ $router.currentRoute.meta.title }}
        </div>
        <x-icon
          v-if="isShowingFeedActionModal"
          @click="closeFeedActionModals"
          size="1.2x"
        ></x-icon>
        <q-r-reader v-else></q-r-reader>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar';
import { MenuIcon, XIcon } from 'vue-feather-icons';
import QRReader from './QRReader';
export default {
  data() {
    return {
      sidebarOpen: false,
    };
  },
  name: 'navbar',
  components: {
    Sidebar,
    MenuIcon,
    QRReader,
    XIcon,
  },
  computed: {
    shadowStyle() {
      if (
        this.$router.currentRoute.meta &&
        this.$router.currentRoute.meta.noShadow
      ) {
        return 'none !important';
      }
      return '';
    },
    isShowingFeedActionModal() {
      const { modal } = this.$store.state;
      return modal.showAddPost || modal.showReportPost;
    },
  },
  methods: {
    closeSidebar(navigated = true) {
      this.sidebarOpen = false;

      // Close feed action modals if navigated to new view
      if (navigated && this.isShowingFeedActionModal) {
        this.closeFeedActionModals();
      }
    },
    closeFeedActionModals() {
      this.$store.dispatch('modal/setAddPost', null);
      this.$store.dispatch('modal/setShowReport', null);
    },
  },
};
</script>
