<template>
  <v-layout>
    <router-view></router-view>
  </v-layout>
</template>

<script>
import VLayout from './layouts/Default';
export default {
  name: 'app',
  components: {
    VLayout,
  },
};
</script>
