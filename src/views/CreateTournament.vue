<template v-on:load="getGames">
  <v-container>
    <h2 class="mt-5">Création d'un tournoi</h2>
    <v-form v-model="valid" ref="createTournamentForm">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-text-field
            v-model="name"
            :counter="54"
            label="Tournament name"
            outlined
            :rules="rules.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-autocomplete
            prepend-inner-icon="mdi-magnify"
            v-model="gameSelected"
            :items="games"
            item-text="name"
            item-value="id"
            no-data-text="No results..."
            label="Chose game"
            clearable
            outlined
            :rules="rules.game"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-autocomplete
            prepend-inner-icon="mdi-magnify"
            v-model="platformsSelected"
            :items="platforms"
            item-text="name"
            item-value="id"
            outlined
            no-data-text="No results"
            label="Chose platform..."
            clearable
            multiple
            :rules="rules.platform"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-autocomplete
            prepend-inner-icon="mdi-magnify"
            v-model="gameModeSelected"
            :items="gameModes"
            item-text="name"
            item-value="id"
            outlined
            no-data-text="Aucun résultats"
            label="Choisis ton mode de jeu..."
            clearable
            :rules="rules.gameMode"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-text-field
            v-model="nb_participant"
            type="number"
            label="Nombre de participant"
            prepend-inner-icon="mdi-counter"
            outlined
            :rules="rules.nbParticipant"
            min="1"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4">
          <v-datetime-picker
            v-model="start_date"
            date-format="dd/mm/yyyy"
            label="Date du tournoi"
            :text-field-props="textFieldProps"
            :date-picker-props="dateProps"
            :time-picker-props="timeProps"
            okText="Valider"
            clearText="Vider"
            :rules="rules.date"
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
          <v-textarea
            outlined
            prepend-inner-icon="mdi-comment"
            v-model="details"
            label="Détails"
            auto-grow
            counter
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <div class="text-right mb-5 mt-5">
            <v-btn class="mr-4" @click="clearForm">Vider</v-btn>
            <v-btn
              class="green white--text"
              @click="createTournament"
              :loading="loading"
              :disabled="!valid || loading"
            >
              Créer
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    gameModeSelected: "",
    gameSelected: "",
    platformsSelected: [],
    loading: false,
    valid: false,
    snackbar: false,
    name: "",
    games: [],
    platforms: [],
    gameModes: [],
    start_date: "",
    nb_participant: "",
    details: "",
    rules: {
      name: [v => !!v || "Name required"],
      game: [v => !!v || "Game required"],
      platform: [v => !!v || "Platform required"],
      gameMode: [v => !!v || "Game mode required"],
      nbParticipant: [v => !!v || "Number participant required"],
      date: [v => !!v || "Date required"]
    },
    textFieldProps: {
      prependInnerIcon: "mdi-calendar",
      outlined: true
    },
    dateProps: {
      locale: "fr",
      firstDayOfWeek: 1
    },
    timeProps: {
      format: "24h"
    }
  }),
  methods: {
    createTournament() {
      const author = JSON.parse(localStorage.getItem("user")).username;
      const authorId = JSON.parse(localStorage.getItem("user")).id;
      this.loading = true;
      this.$http
        .post("/tournament/create", {
          name: this.name,
          start_date: this.start_date,
          createdBy: author,
          game: this.gameSelected,
          platforms: this.platformsSelected,
          game_mode: this.gameModeSelected,
          authorId: authorId,
          nb_participant: this.nb_participant,
          details: this.details
        })
        .then(result => {
          try {
            this.loading = false;
            this.clearForm();
            this.$store.dispatch("showSnackbar", {
              text: result.data.message,
              color: "success"
            });
          } catch (error) {
            console.error(error);
          }
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
          this.$store.dispatch("showSnackbar", {
            text: "Error during creation, please try again later",
            color: "red"
          });
        });
    },
    clearForm() {
      this.name = "";
      this.gameSelected = "";
      this.platformsSelected = [];
      this.name = "";
      this.start_date = "";
      this.nb_participant = "";
      this.details = "";
      this.$refs.createTournamentForm.reset();
    },
    getGames() {
      this.$http("/game")
        .then(result => {
          this.games = result.data;
        })
        .catch(err => {
          this.loading = false;
          this.$store.dispatch("showSnackbar", {
            text: err.response.data.message,
            color: "red"
          });
        });
    },
    getPlatforms() {
      this.$http("/platform")
        .then(result => {
          this.platforms = result.data;
        })
        .catch(err => {
          this.loading = false;
          this.$store.dispatch("showSnackbar", {
            text: err.response.data.message,
            color: "red"
          });
        });
    },
    getGameModes() {
      this.$http("/gameMode")
        .then(result => {
          this.gameModes = result.data;
        })
        .catch(err => {
          this.loading = false;
          this.$store.dispatch("showSnackbar", {
            text: err.response.data.message,
            color: "red"
          });
        });
    }
  },
  created() {
    this.getGames();
    this.getPlatforms();
    this.getGameModes();
  }
};
</script>

<style>
.v-picker {
  border-radius: 0;
}
.v-time-picker-title__time .v-picker__title__btn,
.v-time-picker-title__time span {
  height: auto;
  font-size: 34px;
}
.v-picker__title {
  height: 88px;
}
</style>
