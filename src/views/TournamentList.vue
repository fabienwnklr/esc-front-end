<template>
  <main>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Are you sure to join this tournament?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" outlined @click="dialog = false"> Cancel </v-btn>

          <v-btn
            color="green darken-1"
            outlined
            :loaded="joinLoaded"
            @click="confirmJoin"
          >
            Join
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row v-if="loaded == false" class="mx-auto my-2">
      <v-col cols="12" xl="2" lg="4" md="4" sm="4" v-for="i in 6" :key="i">
        <v-skeleton-loader
          max-width="344"
          elevation="2"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class="mx-auto my-2">
      <h1 v-if="tournaments.length === 0 && logged">
        Aucun tournoi disponible pour le moment... Si t'y remédié ?
        <v-btn to="new-tournament">Créer un tournoi</v-btn>
      </h1>
      <h1 v-else-if="tournaments.length === 0 && !logged">
        Aucun tournoi disponible pour le moment... Si t'y remédié ?
        <v-btn to="login">Connecte toi</v-btn>
      </h1>
      <v-col
        cols="12"
        xl="3"
        lg="4"
        md="4"
        sm="6"
        v-for="(tournament, i) in tournaments"
        :key="i"
      >
        <v-card class="mx-auto">
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

          <v-img :src="`https://picsum.photos/id/${i + 55}/200/200`" height="194"></v-img>

          <v-card-text>
            Détails
            <ul>
              <li class="my-2">Date/Heures de création : {{ tournament.start_date }}</li>
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
                Participants {{ tournament.users.length }}/{{ tournament.nb_participant }}
                :
                <span class="mx-r" v-for="(user, i) in tournament.users" :key="i">
                  {{ user.username }}
                  {{ i === tournament.users.length - 1 ? "" : "," }}
                </span>
              </li>
            </ul>
          </v-card-text>

          <v-card-actions>
            <div v-on="on" v-bind="attrs">
              <v-btn
                v-if="!tournament.userParticipate"
                @click.native="joinTournament(tournament.id)"
                :disabled="tournament.full"
                outlined
                color="primary"
              >
                Join
              </v-btn>
              <v-btn v-else outlined disabled color="secondary">
                Already joinded
              </v-btn>
            </div>

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
                <v-btn icon v-bind="attrs" v-on="on" :to="`tournament/${tournament.id}`">
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    tournaments: [],
    canJoin: true,
    loaded: false,
    joinLoaded: false,
    dialog: false,
    current_id: 0,
  }),
  methods: {
    getTournaments() {
      const _this = this;
      this.$http("/tournament").then((result) => {
        this.tournaments = result.data.map((item) => {
          item.createdAt = new Date(item.createdAt).toLocaleString().slice(0, -3);
          item.start_date = new Date(item.start_date).toLocaleString().slice(0, -3);
          item.full = item.nb_participant === item.users.length;
          item.userParticipate = item.users.find(
            (user) => user.user_tournament.UserId === _this.$store.getters.user.id
          );
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
    },
    joinTournament(id_tournament) {
      this.current_id = id_tournament;
      this.dialog = true;
    },
    confirmJoin() {
      this.$http
        .post("/tournament/addUser", {
          tournament: this.current_id,
          user: this.$store.getters.user.id,
        })
        .then((res) => {
          this.getTournaments();
          this.$store.dispatch("showSnackbar", {
            text: res.data.message,
            color: "success",
          });
          this.dialog = false;
          this.current_id = 0;
        })
        .catch((err) => {
          this.$store.dispatch("showSnackbar", { text: err.message, color: "red" });
          this.dialog = false;
          this.current_id = 0;
        });
    },
  },
  mounted() {
    this.getTournaments();
  },
  computed: {
    ...mapGetters(["logged"]),
  },
};
</script>
