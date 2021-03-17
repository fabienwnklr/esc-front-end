const state = () => ({
  mini: false
});

const mutations = {
  toggleMini(state) {
    state.mini = !state.mini;
  }
};

const actions = {
  toggleMini({ commit }) {
    commit("toggleMini");
  }
};

const getters = {
  mini: state => state.mini
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
