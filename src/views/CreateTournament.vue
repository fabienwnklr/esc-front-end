<template v-on:load="getGames">
<v-container>
  <h2 class="mt-5">Création d'un tournoi</h2>
      <form>
        <v-text-field
          v-model="name"
          :counter="54"
          label="Nom du tournoi"
        ></v-text-field>
          <v-item-group
            v-model="gameProposed"
            multiple
          >
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
                    <v-btn
                      icon
                      dark
                    >
                      <v-icon>
                        {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
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
        v-model="datetime"
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
          <v-btn class="mr-4 green white--text" @click="createTournament">Créer</v-btn>
          <v-btn @click="clear">Vider</v-btn>
        </div>
      </form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: '',
    selectGame: null,
    gameProposed: [],
    games: [],
    platforms: [],
    datetime: new Date(),
    checkbox: []
  }),
  methods: {
    createTournament () {
      console.log(this.name)
      console.log(this.selectGame)
      console.log(this.checkbox)
      console.log(this.datetime)
      // this.$http
      //   .post(this.$serverUrl + '/createTournament', {

      //   })
      //   .then(result => response.data)
      //   .catch(err =>  Promise.reject(err.response.data.detail))
    },
    clear () {
      this.name = ''
      this.datetime = ''
      this.select = null
      this.checkbox = null
    },
    getGames () {
      this.$http
        .get(this.$serverUrl + '/getGames')
        .then((result) => {
          this.games = result.data
        })
        .catch(err =>  Promise.reject(err.response.data.detail))
    },
    getPlatforms () {
      this.$http
        .get(this.$serverUrl + '/getPlatforms')
        .then((result) => {
          this.platforms = result.data
        })
        .catch(err =>  Promise.reject(err.response.data.detail))
    }
  },
  beforeMount () {
    this.getGames()
    this.getPlatforms()
  }
}
</script>

<style>
</style>
