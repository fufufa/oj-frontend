import router from "@/router";
import store from "@/store";
import ACCESS_AUTH from "./accessAuth";
import checkAccess from "./checkAccess";

router.beforeEach(async (to, from, next) => {
  //获取登录用户信息
  let loginUser = store.state.user.loginUser;
  //自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("getLoginUser");
  }
  loginUser = store.state.user.loginUser;
  const needAccess = to.meta?.access ?? ACCESS_AUTH.NOT_LOGIN;
  // 要跳转的页面需要登录
  if (needAccess !== ACCESS_AUTH.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (checkAccess(loginUser, needAccess as string)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
