<template v-on:load="getGames">
  <v-row class="mx-auto">
    <v-col cols="12" md="3" sm="1" v-for="(game, i) in games" :key="i">
      <h4>{{ game.game_name }}</h4>
       <v-img src="https://picsum.photos/400/300" aspect-ratio="1.2">
       </v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    games: []
  }),
  methods: {
    getGames () {
      this.$http
        .get(this.$serverUrl + '/getGames')
        .then((result) => {
          this.games = result.data
        })
    }
  },
  beforeMount () {
    this.getGames()
    // this.getLastTournaments()
  }
}
</script>
