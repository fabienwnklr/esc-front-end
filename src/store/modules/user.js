const state = {
  guest: true,
  logged: false,
  admin: false,
};

const getters = {
  getGuest: (state) => state.guest,
  getLogged: (state) => state.logged,
  getAdmin: (state) => state.admin
}


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
  },
};

const mutations = {
  SET_GUEST(state) {
    state.guest = true;
    state.logged = false;
    state.admin = false;
  },
  SET_LOGGED(state) {
    state.logged = true;
    state.guest = false;
    state.admin = false;
  },
  SET_ADMIN(state) {
    state.admin = true;
    state.logged = true;
    state.guest = false;
  },
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters,
};
