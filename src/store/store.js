import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    guest: true,
    logged: false,
    mini: false,
    admin: false,
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.logged = payload;
    },
    SET_MINI(state, payload) {
      state.mini = payload;
    }
  },
  getters: {
    logged: state => state.logged,
    mini: state => state.mini,
    admin: state => state.admin,
  },
  actions: {},
  strict: true
})
