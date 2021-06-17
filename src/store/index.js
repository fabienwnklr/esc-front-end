import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
