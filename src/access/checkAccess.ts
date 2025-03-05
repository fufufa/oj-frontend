import ACCESS_AUTH from "./accessAuth";

/**
 * 检查权限
 * @param loginUser 登录用户
 * @param role 需要的权限
 * @returns 是否有权限
 */
const checkAccess = (loginUser: any, role = ACCESS_AUTH.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_AUTH.NOT_LOGIN;
  if (role === ACCESS_AUTH.NOT_LOGIN) {
    return false;
  }
  if (role === ACCESS_AUTH.USER) {
    if (loginUserAccess === ACCESS_AUTH.NOT_LOGIN) {
      return false;
    }
  }
  if (role === ACCESS_AUTH.ADMIN) {
    if (loginUserAccess === ACCESS_AUTH.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
