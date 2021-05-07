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
        :timeout="3000"
        app
        top
        centered
        :color="snackbar.color"
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
  data: () => ({
    guest: true,
    logged: false,
    admin: false,
  }),
  methods: {
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
                  _this.guest = false;
                  _this.logged = true;
                  if (
                    user !== null &&
                    typeof user.is_admin !== "undefined" &&
                    user.is_admin === true
                  ) {
                    _this.admin = true;
                  } else {
                    _this.admin = false;
                  }
                })
                .catch((err) => {
                  console.error(err);
                  _this.$logout();
                  return false;
                });
            })
            .catch((err) => {
              console.error(err);
              _this.guest = true;
              _this.logged = false;
              _this.$logout();
            });
        } else {
          this.guest = true;
          this.logged = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      this.guest = true;
      this.logged = false;
      this.admin = false;
      this.$logout();
    },
  },
  updated() {
    this.detectUser();
  },
  computed: {
    ...mapGetters(["getSnackbar"]),
    snackbar: {
      get() {
        return this.getSnackbar;
      },
      set(val) {
        this.$store.dispatch("showSnackbar", val);
      },
    },
  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
