import { StoreOptions } from "vuex";
import ACCESS_AUTH from "@/access/accessAuth";
import { UserControllerService } from "@/api";
export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, users) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_AUTH.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, users) {
      state.loginUser = users;
    },
  },
} as StoreOptions<any>;
