const state = () => ({
  guest: true,
  logged: false,
  admin: false
});

const mutations = {
  setGuest(state) {
    state.guest = true;
    state.logged = false;
    state.admin = false;
  },
  setLogged(state) {
    state.logged = true;
    state.guest = false;
    state.admin = false;
  },
  setAdmin(state) {
    state.admin = true;
    state.logged = true;
    state.guest = false;
  }
};

const actions = {
  setGuest({ commit }) {
    commit("setGuest");
  },
  setLogged({ commit }) {
    commit("setLogged");
  },
  setAdmin({ commit }) {
    commit("setAdmin");
  },
  logout({ commit }) {
    commit("setLogged");
  }
};

const getters = {
  guest: state => state.guest,
  logged: state => state.logged,
  admin: state => state.admin
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
