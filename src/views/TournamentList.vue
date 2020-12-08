<template>
  <v-row class="mx-auto">
    <!-- <h1>Tournois</h1> -->
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
            <li>Date/Heures : {{ tournament.start_date }} </li>
            <li>
              <v-chip class="my-2">
                {{ tournament.games[0].name }}
              </v-chip>
            </li>
            <li>
              <v-chip class="mr-2" v-for="(platform, i) in tournament.platforms" :key="i">
                {{ platform.name }}
              </v-chip>
            </li>
            <li>Participants : 
              <span class="mx-2" v-for="(user, i) in tournament.users" :key="i">
                {{ user.username }},
              </span>
            </li>
          </ul>
        </v-card-text>

        <v-card-actions>

          <v-btn text title="Join" class="primary">
            Participer
          </v-btn>

          <v-spacer></v-spacer>

           <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                title="Add to favorite"
                icon
                v-bind="attrs"
                v-on="on"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
            </template>
            <span>Add to favorite</span>
           </v-tooltip>

           <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                title="More details"
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
                <v-btn 
                title="Share"
                icon
                v-bind="attrs"
                v-on="on"
                >
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
            </template>
            <span>Share</span>
           </v-tooltip>

        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    tournaments: [],
  }),
  methods: {
    getTournaments() {
      this.$http("/tournament").then((result) => {
        this.tournaments = result.data.map(
          (item) => {
            item.createdAt = new Date(item.createdAt).toLocaleString().slice(0, -3);
            item.start_date = new Date(item.start_date).toLocaleString().slice(0, -3);
            }
        );
        this.tournaments = result.data;
      });
    },
  },
  mounted() {
    this.getTournaments();
  },
};
</script>
