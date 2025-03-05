<template>
  <div id="menu">
    <a-row style="margin-bottom: 16px" align="center">
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
          <a-menu-item v-for="route in routes" :key="route.path">
            {{ route.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>
          {{ store.state.user?.loginUser?.userName || "未登录" }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup scoped>
import { useRouter } from "vue-router";
import { routes } from "../router/routes";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();

// 默认的主题
const selectedKeys = ref([routes.path]);

// 每次跳转修改选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const handleClick = (key) => {
  router.push({
    path: key,
  });
};

const store = useStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--color-neutral-2);
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
