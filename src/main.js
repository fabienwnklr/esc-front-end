import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'es6-promise'

// Variable global de vue, $ est la convention Vue pour éviter de se perdre
const APIurl = window.location.host === 'localhost' ? 'http://localhost:55/api' : 'http://esc-api.fabienwinkler.fr'
Vue.prototype.$http = axios.create({
  baseURL: 'http://esc-api.fabienwinkler.fr',
  headers: {
    common: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
  }

})
Vue.prototype.$logout = function () {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  this.$router.push("/login");
  this.$http.defaults.headers.common.Authorization = '';
}
Vue.prototype.$webSiteName = 'Esport community'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
