<template>
  <div>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click="mini = !mini" />
      <span class="title ml-3 mr-5">{{ this.$webSiteName }}</span>
      <v-icon>mdi-xbox-controller</v-icon>
    </v-app-bar>
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
        <template>
          <v-list-item @click="disconnect()">
            <v-list-item-action>
              <v-tooltip right :disabled="!mini">
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-logout</v-icon>
                </template>
                <span>Se déconnecter</span>
              </v-tooltip>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class>Se déconnecter</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "defaultMenu",
  data: () => ({
    drawer: true,
    mini: false,
    items: [
      { heading: 'Principal' },
      { icon: 'mdi-home', text: 'Accueil', to: '/' },
      { icon: 'mdi-new-box', text: 'Créer un tournoi', to: '/new-tournament' },
      { icon: 'mdi-trophy', text: 'Tournois', to: '/tournaments' },
      { icon: 'mdi-twitch', text: 'Live', to: '/live' },
      // { icon: 'mdi-email-send-outline', text: 'Contact', to: '/contact' },
      { heading: 'Compte' },
      { icon: 'mdi-account', text: 'Admin dashboad', to: '/admin' },
      { icon: 'mdi-account', text: 'Mon Profil', to: '/profil' },
    ]
  }),
  methods: {
    disconnect () {
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
      this.$router.push('/login')
      this.$emit('logout')
    }
  }
};
</script>
