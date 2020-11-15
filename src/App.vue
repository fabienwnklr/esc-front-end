<template>
    <v-app>
        <defaultMenu v-if="guest"></defaultMenu>
        <userMenu v-else-if="logged && !admin"></userMenu>
        <adminMenu v-else-if="logged && admin"></adminMenu>
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
import { authHeader } from './helpers';

export default {
    components: {
        footerComponent,
        defaultMenu,
        userMenu,
        adminMenu,
    },
    data: () => ({
      guest: true,
      logged: false,
      admin: false
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
                            headers: authHeader(),
                        })
                        .then((res) => {
                            // console.table(res)
                            this.guest = false;
                            this.logged = true;
                            if (
                                user !== null &&
                                typeof user.is_admin !== "undefined" &&
                                user.is_admin === true
                            ) {
                                this.admin = true;
                            } else {
                                this.admin = false;
                            }
                        })
                        .catch((err) => {
                            // console.log(err)
                            localStorage.removeItem("jwt");
                            localStorage.removeItem("user");
                            return false;
                        });
                } else {
                  this.guest = true;
                    this.logged = false;
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
    }
};
</script>

<style>
#keep .v-navigation-drawer__border {
    display: none;
}
</style>
