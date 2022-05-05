<template>
  <div>
    <AppBar></AppBar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="secondary"
      :mini-variant="mini"
      permanent
    >
      <v-list dense class="secondary">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>
          <v-list-item v-else :key="i" link :to="item.to">
            <v-list-item-action>
              <v-tooltip right :disabled="!mini">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">{{ item.icon }}</v-icon>
                </template>
                <span>{{ item.text }}</span>
              </v-tooltip>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppBar from "../AppBar.vue";

export default {
  name: "defaultMenu",
  components: { AppBar },
  data: () => ({
    drawer: true,
    items: [
      // { heading: "Principal" },
      { icon: "mdi-home", text: "Accueil", to: "/" },
      { icon: "mdi-new-box", text: "Créer un tournoi", to: "/new-tournament" },
      { icon: "mdi-trophy", text: "Tournois", to: "/tournaments" },
      { icon: "mdi-twitch", text: "Live", to: "/live" },
      // { icon: 'mdi-email-send-outline', text: 'Contact', to: '/contact' },
      // { heading: "Compte" },
      // {
      //   icon: "mdi-shield-account-outline",
      //   text: "Admin dashboad",
      //   to: "/admin",
      // },
      // { icon: "mdi-account", text: "Mon Profil", to: "/profil" },
    ],
  }),
  methods: {
    ...mapActions(["toggleMini"]),
  },
  computed: {
    ...mapState({
      mini: (state) => state.menu.mini,
    }),
  },
};
</script>
