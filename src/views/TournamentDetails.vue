<template>
  <main>
    <section>
      <v-img
        width="100%"
        height="auto"
        :eager="true"
        :src="this.imgUrl"
        alt=""
      >
      </v-img>
    </section>
    <h1>{{ tournamentDetails.name }}</h1>
  </main>
</template>

<script>
export default {
  data: () => ({
    tournamentDetails: {},
    imgUrl: '',
  }),
  methods: {
    getDetailsTournament() {
      this.$http(`/tournament/${this.$route.params.id}`)
        .then((res) => {
          this.tournament = res.data;
          this.imgUrl = `../assets/${this.tournament.games[0].name.toLowerCase()}.jpg`
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getDetailsTournament();
  },
};
</script>

<style>
</style>