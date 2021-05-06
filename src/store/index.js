import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import menu from "./modules/menu";
import user from "./modules/user";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    app,
    menu,
    user
  },
  strict: debug
});
