import router from "@/router";
import { useStore } from "vuex";
import ACCESS_AUTH from "./accessAuth";
import checkAccess from "./checkAccess";

router.beforeEach(async function (to, from, next) {
  //获取登录用户信息
  const store = useStore();
  const loginUser = store.state.user.loginUser;
  //自动登录
  if (!loginUser.userRole) {
    await store.dispatch("getLoginUser");
  }
  const needAccess = to.meta?.access ?? ACCESS_AUTH.NOT_LOGIN;
  // 要跳转的页面需要登录
  if (needAccess !== ACCESS_AUTH.NOT_LOGIN) {
    if (
      !store.state.user.loginUser ||
      !store.state.user.loginUser.userRole ||
      store.state.user.loginUser.userRole === ACCESS_AUTH.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (checkAccess(store.state.user.loginUser, needAccess as string)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
