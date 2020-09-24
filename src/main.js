import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'es6-promise'

// Variable global de vue, $ est la convention Vuejs pour évité de se perdre
Vue.prototype.$serverUrl = `http://localhost:1272/api`
Vue.prototype.$http = axios
Vue.prototype.$webSiteName = 'Esport community'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
