<template>
  <div id="menu">
    <a-row style="margin-bottom: 10px" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="handleClick"
        >
          <a-menu-item key="0" disabled>
            <div class="title-bar">
              <img src="../assets/logo.jpg" class="logo" alt="" />
              <div class="title">判题系统</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="route in visibleRoutes" :key="route.path">
            {{ route.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="150px" style="padding-right: 20px">
        <div>
          <div
            class="beforLogin"
            v-if="!store.state.user?.loginUser?.id"
            @click="handleClick('/user/login')"
            style="cursor: pointer"
          >
            请登录
          </div>
          <div class="afterLogin" v-else>
            <a-popover trigger="click">
              <a-button type="text">
                <a-typography-text style="margin-bottom: 0px" ellipsis>
                  welcome
                  {{
                    store.state.user?.loginUser?.userName ||
                    store.state.user?.loginUser?.userAccount
                  }}
                </a-typography-text></a-button
              >
              <template #content>
                <a-button type="primary" status="danger" @click="signOut"
                  >退出登录</a-button
                >
              </template>
            </a-popover>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { routes } from "../router/routes";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import { UserControllerService } from "@/api";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (checkAccess(store.state.user?.loginUser, item?.meta?.access)) {
      return false;
    }
    return true;
  });
});
// 默认的主题
const selectedKeys = ref([routes.path]);

// 每次跳转修改选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 跳转到指定的路由
const handleClick = (key) => {
  router.push({
    path: key,
  });
};

// 退出登录
const signOut = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    message.success("退出成功");
    await store.dispatch("getLoginUser");
  } else {
    message.error("退出失败" + res.message);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu {
  box-sizing: border-box;
  width: 100%;
  background-color: white;
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  width: 48px;
  height: 48px;
  margin-right: 16px;
}

.title {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-neutral-10);
}
</style>
