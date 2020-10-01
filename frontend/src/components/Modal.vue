<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"> </slot>
          <button class="btn-modal" @click="close">
            <plus-icon size="2.5x"></plus-icon>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"> </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons';

export default {
  name: 'modal',
  props: {
    closeFunction: {
      type: Function, 
      default: null
      },
  },
  components: {
    PlusIcon,
  },
  methods: {
    close() {
      if (this.$store.state.auth.authenticated) {
        this.$store.dispatch('account/update', { infoSeen: true });
      }
      this.$store.dispatch('modal/set', false);
      this.$store.dispatch('modal/setAbout', false);
      if(this.closeFunction !== null) {
        this.closeFunction();
      }
    },
  },
};
</script>
