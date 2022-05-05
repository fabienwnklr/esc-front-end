import router from '../../router';

const state = {
	guest: true,
	logged: false,
	admin: false,
	user: {}
};

const getters = {
	guest: state => state.guest,
	logged: state => state.logged,
	admin: state => state.admin,
	user: state => state.user
};

const actions = {
	setGuest({ commit }) {
		commit('SET_GUEST');
	},
	setLogged({ commit }) {
		commit('SET_LOGGED');
	},
	setAdmin({ commit }) {
		commit('SET_ADMIN');
	},
	setUser({ commit }, payload) {
		commit('SET_USER', payload);
	},
	logout({ commit }) {
		commit('SET_GUEST');
		commit('SET_USER', {});
		localStorage.removeItem('jwt');
		localStorage.removeItem('user');
		router.push('/login');
	}
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
	SET_USER(state, payload) {
		state.user = payload;
	}
};

export default {
	namespace: true,
	state,
	mutations,
	actions,
	getters
};
