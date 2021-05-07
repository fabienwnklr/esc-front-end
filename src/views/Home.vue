<template>
  <main>
    <v-row v-if="loaded == false" class="mx-auto">
      <v-col cols="12" md="3" sm="1" v-for="i in 3" :key="i">
        <v-skeleton-loader class="" max-width="" type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class="mx-auto">
      <v-col cols="12" md="3" sm="1" v-for="(game, i) in games" :key="i">
        <v-img src="https://picsum.photos/400/300" aspect-ratio="1.2"> </v-img>
      </v-col>
    </v-row>
  </main>
</template>

<script>
export default {
  data: () => ({
    games: [],
    loaded: false,
  }),
  methods: {
    getAllGames() {
      const that = this;
      this.$http("/game").then((result) => {
        that.games = result.data;
        that.loaded = true;
        // document.querySelector('.v-sheet').remove();
      });
    },
  },
  mounted() {
    this.getAllGames();
  },
};
</script>
