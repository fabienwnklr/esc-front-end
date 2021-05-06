const state = {
  theme: "light",
  locale: "fr",
  snackbar: {
    show: false,
    text: "",
    color: "",
  },
  notifications: [
    {
      id: 0,
      title: "My first notificiations",
      color: "light-green",
      icon: "mdi-account-circle",
      timeLabel: "Just now",
    },
  ],
};

const getters = {
  getSnackbar: (state) => state.snackbar,
  getLocale: (state) => state.locale,
  getTheme: (state) => state.theme,
  getNotifications: (state) => state.notifications
}

const actions = {
  addNotification({ commit }, { text, id }) {
    const note = {
      id: id,
      title: text,
      color: "light-green",
      icon: "mdi-account-circle",
      timeLabel: "Just now",
    };
    commit("ADD_NOTIFICATION", note);
  },
  clearNotificaton({ commit }) {
    commit("CLEAR_NOTIFICATION");
  },
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme);
  }
};

const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload;
  },
  SET_LOCALE(state, locale) {
    state.locale = locale;
  },
  ADD_NOTIFICATION(state, payload) {
    state.notifications.push(payload);
  },
  CLEAR_NOTIFICATION(state) {
    state.notifications = [];
  },
  SHOW_SNACKBAR(state, { color, text }) {
    state.snackbar.show = true;
    state.snackbar.color = color;
    state.snackbar.text = text;
  },
  HIDE_SNACKBAR(state) {
    state.snackbar.show = false;
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};
