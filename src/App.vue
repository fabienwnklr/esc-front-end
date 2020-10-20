<template>
  <v-app>
    <defaultMenu v-if="!userDetected"></defaultMenu>
    <userMenu v-else-if="!isAdmin"></userMenu>
    <adminMenu v-else></adminMenu>
    <v-main>
      <router-view></router-view>
      <footerComponent></footerComponent>
    </v-main>
  </v-app>
</template>

<script>
import defaultMenu from './components/defaultMenu'
import userMenu from './components/userMenu'
import adminMenu from './components/adminMenu'
import footerComponent from './components/Footer'
export default {
  components: {
    footerComponent,
    defaultMenu,
    userMenu,
    adminMenu,
  },
  data: () => ({
    userDetected: false,
    isAdmin: false,
  }),
  methods: {
    /**
     * function for check if user connected
     * @return {boolean}
     */
    detectUser () {
      try {
        const jwt = localStorage.getItem('jwt')
        const user = localStorage.getItem('user')
        if (jwt !== null && user !== null) {
          this.userDetected = true
        } else {
          this.userDetected = false
          localStorage.clear()
        }
      } catch (error) {
        console.error(error)
      }
    },
    detectIfIsAdmin () {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user !== null && typeof user.is_admin !== 'undefined' && user.is_admin === true) {
        this.isAdmin = true;
      }
    },
    logout () {
      this.userDetected = false
      localStorage.clear()
      this.$router.push('/')
    }
  },
  // Fonction appelé à chaque modif du DOM donc pour chaque page
  updated () {
    this.detectUser()
    this.detectIfIsAdmin()
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
