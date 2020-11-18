export default {
  state: {
    idTable: null,
    idHelp: null,
    user: null
  },
  mutations: {
    SET_IDTABLE(state, value) {
      state.idTable = value;
    },
    SET_IDHELP(state, value) {
      state.idHelp = value
    },
    SET_USER(state, value) {
      state.user = value
    }
  },
  actions: {}
};
