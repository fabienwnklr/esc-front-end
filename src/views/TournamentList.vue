<template>
  <main>
    <v-row v-if="loaded == false" class="mx-auto">
      <v-col cols="12" xl="2" lg="4" md="4" sm="4" v-for="i in 6" :key="i">
        <v-skeleton-loader
          max-width="344"
          elevation="2"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class="mx-auto">
      <h1 v-if="tournaments.length === 0 && this.$data.logged">
        Aucun tournoi disponible pour le moment... Si t'y remédié ?
        <v-tbn to="/create-tournament">Créer un tournoi</v-tbn>
      </h1>
      <h1 v-else-if="tournaments.length === 0 && !this.$data.logged">
        Aucun tournoi disponible pour le moment... Si t'y remédié ?
        <v-btn to="login">Connecte toi</v-btn>
      </h1>
      <v-col
        cols="12"
        xl="2"
        lg="4"
        md="4"
        sm="4"
        v-for="(tournament, i) in tournaments"
        :key="i"
      >
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="">
              <v-img
                class="elevation-6"
                :src="`https://picsum.photos/id/${i + 12}/100/100`"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                tournament.name
              }}</v-list-item-title>
              <v-list-item-subtitle
                >créé par {{ tournament.createdBy }} le
                {{ tournament.createdAt }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-img
            :src="`https://picsum.photos/id/${i + 55}/200/200`"
            height="194"
          ></v-img>

          <v-card-text>
            Détails
            <ul>
              <li class="my-2">Date/Heures : {{ tournament.start_date }}</li>
              <li class="my-2">
                <v-chip small>
                  {{ tournament.games[0].name }}
                </v-chip>
              </li>
              <li>
                <v-chip
                  small
                  class="mr-2"
                  v-for="(platform, i) in tournament.platforms"
                  :key="i"
                >
                  {{ platform.name }}
                </v-chip>
              </li>
              <li class="my-2">
                Participants {{ tournament.users.length }}/{{
                  tournament.nb_participant
                }}
                <span
                  class="mx-2"
                  v-for="(user, i) in tournament.users"
                  :key="i"
                >
                  {{ user.username }},
                </span>
              </li>
            </ul>
          </v-card-text>

          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div v-on="on" v-bind="attrs">
                  <v-btn :disabled="tournament.full" outlined color="primary">
                    Participer
                  </v-btn>
                </div>
              </template>
              <span>{{
                tournament.full === false
                  ? `Join tournament`
                  : `Tournament is full`
              }}</span>
            </v-tooltip>

            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </template>
              <span>Add to favorite</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  :to="`tournament/${tournament.id}`"
                >
                  <v-icon>mdi-page-next-outline</v-icon>
                </v-btn>
              </template>
              <span>More details</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </template>
              <span>Share</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </main>
</template>

<script>
export default {
  data: () => ({
    tournaments: [],
    canJoin: true,
    loaded: false
  }),
  methods: {
    getTournaments() {
      this.$http("/tournament").then(result => {
        this.tournaments = result.data.map(item => {
          item.createdAt = new Date(item.createdAt)
            .toLocaleString()
            .slice(0, -3);
          item.start_date = new Date(item.start_date)
            .toLocaleString()
            .slice(0, -3);
          item.full = item.nb_participant === item.users.length;
        });
        this.tournaments = result.data;
        this.loaded = true;
      });
    },
    checkIfCanIJoin(tournament) {
      if (tournament.users.length === 100) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.getTournaments();
  }
};
</script>
