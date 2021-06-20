<template>
  <v-app-bar app clipped-left color="primary" dark>
    <v-app-bar-nav-icon @click="toggleMini" />
    <h1 class="headline">{{ this.$webSiteName }}</h1>
    <v-spacer />
    <v-toolbar-items>
      <v-menu
        offset-y
        origin="center center"
        class="elelvation-1"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon text slot="activator" v-on="on">
            <v-badge color="red" overlap>
              <span slot="badge">{{ notifications.length }}</span>
              <v-icon medium>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <NotificationsList :items="notifications"></NotificationsList>
      </v-menu>
      <v-menu
        offset-y
        origin="center center"
        class="elelvation-1"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn text slot="activator" v-on="on">
            <v-icon medium>mdi-translate</v-icon>
            <span class="ml-2"> {{ localeText }} </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="$vuetify.lang.current">
            <v-list-item
              @click="handleChangeLocale(item)"
              v-for="item in availableLanguages"
              :key="item.value"
              :value="item.value"
            >
              <v-list-item-title v-text="item.text" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu offset-y origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large text slot="activator" v-on="on">
            <v-avatar size="30px">
              <img />
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :to="item.href ? item.href : null"
            :disabled="item.disabled"
            @click="item.click"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$store.dispatch('logout')">
            <v-list-item-action>
              <v-icon>mdi-power</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NotificationsList from "./list/NotificationsList.vue";
export default {
  name: "appbar",
  components: { NotificationsList },
  data: () => ({
    availableLanguages: [],
    profileMenus: [
      {
        icon: "mdi-account",
        href: "profil",
        title: "Profile",
        click: "",
      },
      {
        icon: "mdi-cog",
        href: "",
        title: "Settings",
        click: "",
      },
    ],
    localeText: navigator.language.split("-")[0],
  }),
  computed: {
    ...mapState({
      mini: (state) => state.menu.mini,
    }),
    ...mapGetters(["notifications"]),
  },
  methods: {
    ...mapActions(["toggleMini"]),
  },
};
</script>
