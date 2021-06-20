<template>
  <v-app-bar app clipped-left color="primary">
    <v-app-bar-nav-icon @click="toggleMini" />
    <span class="title ml-3 mr-5">{{ this.$webSiteName }}</span>
    <v-icon>mdi-xbox-controller</v-icon>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "appbar",
  data: () => ({}),
  computed: {
    ...mapState({
      mini: (state) => state.menu.mini,
    }),
  },
  methods: {
    ...mapActions(["toggleMini"]),
  },
};
</script>
