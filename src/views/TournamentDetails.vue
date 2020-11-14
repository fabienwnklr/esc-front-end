<template>
  <h1>{{ tournament.name }}</h1>
</template>

<script>
export default {
  data: () => ({
    tournament: {}
  }),
  methods: {
    getDetailsTournament() {
      this.$http
        .get(`${this.$serverUrl}/tournaments/${this.$route.params.id}`)
        .then((res) => {
          this.tournament = res.data;
          console.log(this.tournament)
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