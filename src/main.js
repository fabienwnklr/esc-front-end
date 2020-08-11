import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// Variable global de vue, $ est la convention Vuejs pour évité de se perdre
Vue.prototype.$serverUrl = `http://localhost:5000/api`
Vue.prototype.$http = axios
Vue.prototype.$webSiteName = 'Esport community'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
