import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'es6-promise'

// Variable global de vue, $ est la convention Vue pour éviter de se perdre
Vue.prototype.$serverUrl = ``
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:55/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
})
Vue.prototype.$webSiteName = 'Esport community'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
