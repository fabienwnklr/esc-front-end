<template>
  <v-app>
    <v-main>
      <defaultMenu v-if="guest"></defaultMenu>
      <userMenu v-else-if="logged && !admin"></userMenu>
      <adminMenu
        v-else-if="logged && admin && this.$route.path.match(/admin/i) === null"
      ></adminMenu>
      <adminMenuFull
        v-else-if="logged && admin && this.$route.path.match(/admin/i) !== null"
      ></adminMenuFull>
      <router-view></router-view>
      <!-- global snackbar -->
      <v-snackbar
        v-model="snackbar.show"
        app
        bottom
        right
        :color="snackbar.color"
        @close="removeFromStore"
      >
        {{ snackbar.text }}
        <template #action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="$store.dispatch('hideSnackbar')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <footerComponent></footerComponent>
    </v-main>
  </v-app>
</template>

<script>
import defaultMenu from "./components/defaultMenu";
import userMenu from "./components/userMenu";
import footerComponent from "./components/Footer";
import adminMenu from "./components/admin/adminMenu";
import adminMenuFull from "./components/admin/adminMenuFull";

import { mapGetters } from "vuex";

export default {
  components: {
    footerComponent,
    defaultMenu,
    userMenu,
    adminMenu,
    adminMenuFull,
  },
  data: () => ({}),
  methods: {
    removeFromStore() {
      this.$store.dispatch("hideSnackbar");
    },
    /**
     * function for check if user connected
     * @return {boolean}
     */
    detectUser() {
      try {
        const jwt = localStorage.getItem("jwt");
        const user =
          localStorage.getItem("user") !== null
            ? JSON.parse(localStorage.getItem("user"))
            : null;
        const _this = this;
        if (jwt !== null && user !== null) {
          this.$http(`/user/${user.id}`)
            .then(() => {
              _this
                .$http("/checkToken")
                .then(() => {
                  if (
                    user !== null &&
                    typeof user.is_admin !== "undefined" &&
                    user.is_admin === true
                  ) {
                    if (_this.admin === false) {
                      _this.$store.dispatch("setAdmin");
                    }
                  } else {
                    if (_this.logged === false) {
                      _this.$store.dispatch("setLogged");
                    }
                  }
                })
                .catch((err) => {
                  console.error(err);
                  _this.$store.dispatch("logout");
                });
            })
            .catch((err) => {
              console.error(err);
              _this.guest = true;
              _this.logged = false;
              _this.$store.dispatch("logout");
            });
        } else {
          _this.$store.dispatch("setGuest");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  updated() {
    this.detectUser();
  },
  computed: {
    ...mapGetters(["snackbar", "guest", "logged", "admin"]),
  },
  beforeMount() {
    window.addEventListener("beforeunload", () => this.$store.dispatch("hideSnackbar"));
  },
};
</script>

<style>
html {
  overflow: auto;
}
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
