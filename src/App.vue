<template>
    <v-app>
        <defaultMenu v-if="guest"></defaultMenu>
        <userMenu v-else-if="logged"></userMenu>
        <adminMenu v-else-if="admin"></adminMenu>
        <v-main>
            <router-view></router-view>
            <footerComponent></footerComponent>
        </v-main>
    </v-app>
</template>

<script>
import defaultMenu from "./components/defaultMenu";
import userMenu from "./components/userMenu";
import adminMenu from "./components/adminMenu";
import footerComponent from "./components/Footer";
export default {
    components: {
        footerComponent,
        defaultMenu,
        userMenu,
        adminMenu,
    },
    data: () => ({
      userDetected: false,
      isAdmin: false
    }),
    methods: {
        /**
         * function for check if user connected
         * @return {boolean}
         */
        detectUser() {
            try {
                const jwt = localStorage.getItem("jwt");
                const user = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem('user')) : null;

                if (jwt !== null && user !== null) {
                    this.$http
                        .get(this.$serverUrl + "/checkToken", {
                            headers: {
                                Authorize: "Bearer " + jwt,
                            },
                        })
                        .then((res) => {
                            // console.table(res)
                            this.userDetected = true;
                            if (
                                user !== null &&
                                typeof user.is_admin !== "undefined" &&
                                user.is_admin === true
                            ) {
                                this.isAdmin = true;
                            }
                        })
                        .catch((err) => {
                            // console.log(err)
                            localStorage.removeItem("jwt");
                            localStorage.removeItem("user");
                            return false;
                        });
                } else {
                    this.userDetected = false;
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error(error);
            }
        },
        logout() {
            this.$userDetected = false;
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            this.$router.push("/login");
        },
    },
    updated() {
        this.detectUser();
    },
    computed: {
      guest : {
        get () {
          return this.$store.state.guest
        }
      },
      logged: {
        get () {
          return this.$store.state.logged;
        }
      },
      admin: {
        get () {
          return this.$store.state.admin;
        }
      },

    }
};
</script>

<style>
#keep .v-navigation-drawer__border {
    display: none;
}
</style>
