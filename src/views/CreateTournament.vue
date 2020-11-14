<template v-on:load="getGames">
  <v-container>
    <h2 class="mt-5">Création d'un tournoi</h2>
    <form>
      <v-text-field
        v-model="name"
        :counter="54"
        label="Nom du tournoi"
      ></v-text-field>
      <v-item-group v-model="gameProposed" multiple>
        <v-row>
          <v-col
            v-for="(item, i) in games"
            :key="i"
            cols="12"
            lg="3"
            md="3"
            sm="2"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-img
                :src="`https://picsum.photos/id/${i * 15}/200/300`"
                height="150"
                class="text-right pa-2"
                @click="toggle"
              >
                <v-btn icon dark>
                  <v-icon>
                    {{ active ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                </v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
      <v-autocomplete
        prepend-inner-icon="mdi-magnify"
        v-model="selectGame"
        :items="games"
        item-text="game_name"
        item-value="game_name"
        no-data-text="Aucun résultats"
        label="Choisis ton jeu..."
        clearable
      ></v-autocomplete>
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
    loading: false,
    alert: null,
    snackbar: false,
    name: "",
    selectGame: null,
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
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
          this.alert = err.data.message;
          this.snackbar = true;
        });
    },
    clear() {
      this.name = "";
      this.datetime = "";
      this.select = null;
      this.checkbox = null;
      this.snackbar = false;
    },
    getGames() {
      this.$http
        .get(this.$serverUrl + "/getGames")
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
        .get(this.$serverUrl + "/getPlatforms")
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
