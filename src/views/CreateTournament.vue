<template v-on:load="getGames">
  <v-container>
    <h2 class="mt-5">Création d'un tournoi</h2>
    <form>
      <v-text-field
        v-model="name"
        :counter="54"
        label="Nom du tournoi"
      ></v-text-field>
      <v-autocomplete
        prepend-inner-icon="mdi-magnify"
        v-model="selectGame"
        :items="games"
        item-text="name"
        item-value="name"
        no-data-text="Aucun résultats"
        label="Choisis ton jeu..."
        clearable
      ></v-autocomplete>
      <v-autocomplete
        prepend-inner-icon="mdi-magnify"
        v-model="selectPlatform"
        :items="platforms"
        item-text="name"
        item-value="name"
        no-data-text="Aucun résultats"
        label="Choisis ta plateforme..."
        clearable
      ></v-autocomplete>
      <v-text-field
       type="number"></v-text-field>
      <v-row>
        <v-col
          cols="12"
          v-for="(platform, i) in platforms"
          :key="i"
          lg="2"
          md="2"
          sm="2"
        >
          <v-checkbox
            v-model="checkbox"
            :label="platform.platform_name"
            :value="platform.platform_name"
            :id="platform.platform_name + '_' + platform.platform_id"
          >
          </v-checkbox>
        </v-col>
      </v-row>
      <v-datetime-picker
        v-model="start_date"
        date-format="MM/dd/yyyy"
        label="Date du tournoi"
        locale="fr-FR"
        okText="Valider"
        clearText="Vider"
      >
        <template slot="dateIcon">
          <v-icon>mdi-calendar</v-icon>
        </template>
        <template slot="timeIcon">
          <v-icon>mdi-clock</v-icon>
        </template>
      </v-datetime-picker>
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
    selectGame: null,
    selectPlatform: null,
    loading: false,
    alert: null,
    snackbar: false,
    name: "",
    gameProposed: [],
    games: [],
    platforms: [],
    start_date: new Date(),
    checkbox: [],
  }),
  methods: {
    createTournament() {
      const author = JSON.parse(localStorage.getItem("user")).username;
      this.loading = true;
      this.$http
        .post(
          this.$serverUrl + "/tournaments/create",
          {
            name: this.name,
            start_date: this.start_date,
            author: author,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
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
      this.checkbox = null;
    },
    getGames() {
      this.$http
        .get(this.$serverUrl + "/games")
        .then((result) => {
          this.games = result.data;
        })
        .catch((err) => {
          this.loading = false;
          this.alert = err.response.data.message;
        });
    },
    getPlatforms() {
      this.$http
        .get(this.$serverUrl + "/platforms")
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
  }
};
</script>

<style>
</style>
