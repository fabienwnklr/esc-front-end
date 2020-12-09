<template v-on:load="getGames">
  <v-container>
    <h2 class="mt-5">Création d'un tournoi</h2>
    <form>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-text-field
            v-model="name"
            :counter="54"
            label="Nom du tournoi"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-autocomplete
            prepend-inner-icon="mdi-magnify"
            v-model="gameSelected"
            :items="games"
            item-text="name"
            item-value="id"
            no-data-text="Aucun résultats"
            label="Choisis ton jeu..."
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
        <v-autocomplete
          prepend-inner-icon="mdi-magnify"
          v-model="platformsSelected"
          :items="platforms"
          item-text="name"
          item-value="id"
          no-data-text="Aucun résultats"
          label="Choisis ta plateforme..."
          clearable
          multiple
        ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
        <v-text-field
          v-model="nb_participant"
          type="number"
          label="Nombre de participant"
          prepend-inner-icon="mdi-counter"
        ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
        <v-datetime-picker
          v-model="start_date"
          date-format="MM/dd/yyyy"
          label="Date du tournoi"
          locale="fr"
          okText="Valider"
          clearText="Vider"
          prepend-icon="mdi-calendar"
        >
          <template slot="dateIcon">
            <v-icon>mdi-calendar</v-icon>
          </template>
          <template slot="timeIcon">
            <v-icon>mdi-clock</v-icon>
          </template>
        </v-datetime-picker>
        </v-col>
        <v-col cols="12">
          <div class="text-right mb-5 mt-5">
          <v-btn
            class="mr-4 green white--text"
            @click="createTournament"
            :loading="loading"
          >
            Créer
          </v-btn>
          <v-btn @click="clear">Vider</v-btn>
        </div>
        </v-col>
      </v-row>
    </form>

    <v-snackbar v-model="snackbar">
      {{ this.alert }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    gameSelected: '',
    platformsSelected: [],
    loading: false,
    alert: null,
    snackbar: false,
    name: "",
    games: [],
    platforms: [],
    start_date: new Date(),
    nb_participant: 1,
  }),
  methods: {
    createTournament() {
      const author = JSON.parse(localStorage.getItem("user")).username;
      const authorId = JSON.parse(localStorage.getItem('user')).id;
      this.loading = true;
      this.$http
        .post("/tournament/create", {
          name: this.name,
          start_date: this.start_date,
          createdBy: author,
          game: this.gameSelected,
          platforms: this.platformsSelected,
          authorId: authorId,
          nb_participant: this.nb_participant
        })
        .then((result) => {
          this.loading = false;
          this.alert = result.data.message;
          this.snackbar = true;
          this.clear();
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
          this.alert = err.message;
          this.snackbar = true;
        });
    },
    clear() {
      this.name = "";
      this.datetime = "";
      this.select = null;
    },
    getGames() {
      this.$http("/game")
        .then((result) => {
          this.games = result.data;
        })
        .catch((err) => {
          this.loading = false;
          this.alert = err.response.data.message;
        });
    },
    getPlatforms() {
      this.$http("/platform")
        .then((result) => {
          this.platforms = result.data;
        })
        .catch((err) => {
          this.loading = false;
          this.alert = err.response.data.message;
        });
    },
  },
  mounted() {
    this.getGames();
    this.getPlatforms();
  },
};
</script>

<style>
.v-picker {
    border-radius: 0;
}
.v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span {
  height: auto;
  font-size: 34px;
}
.v-picker__title {
  height: 88px;
}
</style>
