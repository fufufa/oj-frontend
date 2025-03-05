import { StoreOptions } from "vuex";
import ACCESS_AUTH from "@/access/accessAuth";
export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_AUTH.NOT_LOGIN,
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
