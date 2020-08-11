<template>
  <v-app>
    <defaultMenu v-if="!userDetected"></defaultMenu>
    <userMenu v-else></userMenu>
    <v-content>
      <router-view></router-view>
      <FooterComponent></FooterComponent>
    </v-content>
  </v-app>
</template>

<script>
import defaultMenu from './components/defaultMenu'
import userMenu from './components/userMenu'
import FooterComponent from './components/Footer'
export default {
  components: {
    FooterComponent,
    defaultMenu,
    userMenu
  },
  data: () => ({
    userDetected: false
  }),
  methods: {
    /**
     * function for check if user connected
     * @return {boolean}
     */
    detectUser () {
      try {
        let jwt = JSON.parse(localStorage.getItem('jwt'))
        if (jwt !== null) {
          this.userDetected = true
        } else {
          this.userDetected = false
          localStorage.clear()
        }
      } catch (error) {
        console.error(error)
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
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
