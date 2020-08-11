<template v-on:load="getGames">
  <v-row  class="mx-auto">
    <!-- <h1>Tournois</h1> -->
    <v-col cols="12" xl="2" lg="3" md="3" sm="4" v-for="(item, i) in tournaments" :key="i">
      <v-card max-width='344' class='mx-auto'>
      <v-list-item>
        <v-list-item-avatar color=''>
          <v-img
            class="elevation-6"
            :src="`https://picsum.photos/id/${i+12}/100/100`"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class='headline'>Nom du tournoi</v-list-item-title>
          <v-list-item-subtitle>créé par Kurt Wagner</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img :src="`https://picsum.photos/id/${i+55}/200/200`" height='194'></v-img>

      <v-card-text>Détails (plateforme, date, mode de jeu)</v-card-text>

      <v-card-actions>
        <v-btn text class='primary'>Participer</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    tournaments: []
  }),
  methods: {
    getTournaments () {
      this.$http
        .get(this.$serverUrl + '/getAllTournaments')
        .then((result) => {
          this.tournaments = result.data
        })
    }
  },
  beforeMount () {
    this.getTournaments()
  }
}
</script>
