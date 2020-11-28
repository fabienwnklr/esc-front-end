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
                const _this = this;
                if (jwt !== null && user !== null) {
                    this.$http(`/user/${user.id}`)
                    .then(res => {
                        console.log(res)
                        _this.$http("/checkToken")
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
                    .catch(err => {
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
    }
};
</script>

<style>
#keep .v-navigation-drawer__border {
    display: none;
}
</style>
