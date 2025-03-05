import { StoreOptions } from "vuex";

export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "fufu",
      role: "admin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, users) {
      commit("updateUser", users);
    },
  },
  mutations: {
    updateUser(state, users) {
      state.loginUser = users;
    },
  },
} as StoreOptions<any>;
