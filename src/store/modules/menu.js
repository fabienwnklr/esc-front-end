const state = {
	mini: false
};

const mutations = {
	TOGGLE_MINI(state) {
		state.mini = !state.mini;
	}
};

const actions = {
	toggleMini({ commit }) {
		commit('TOGGLE_MINI');
	}
};

const getters = {
	mini: state => state.mini
};

export default {
	namespace: true,
	state,
	mutations,
	actions,
	getters
};
