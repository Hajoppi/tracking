<template>
  <div class="accordion">
    <div class="header" v-on:click="toggle" :class="{ open: show }">
      <slot name="header"></slot>
      <div style="flex-grow: 1"></div>
      <chevron-down-icon
        size="1.5x"
        class="header-icon"
        v-bind:class="{ rotate: show }"
      ></chevron-down-icon>
    </div>
    <transition
      name="accordion"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
    >
      <div class="body" v-show="show">
        <div class="body-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons';

export default {
  /**
   * The name of the page.
   */
  name: 'accordion',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle: function() {
      this.show = !this.show;
    },
    beforeEnter: function(el) {
      el.style.height = '0';
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function(el) {
      el.style.height = '0';
    },
  },
  components: {
    ChevronDownIcon,
  },
};
</script>
