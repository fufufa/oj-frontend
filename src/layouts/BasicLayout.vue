<template>
  <div id="basiclayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalMenu />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"
        >© 2025 毕业设计 联系方式：2310610062@qq.com</a-layout-footer
      >
    </a-layout>
  </div>
</template>

<style scoped>
#basiclayout {
}

#basiclayout .header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

#basiclayout .content {
  padding: 20px;
  margin-bottom: 16px;
  background-color: rgb(247, 248, 250);
}

#basiclayout .footer {
  background-color: rgb(26, 26, 26);
  color: rgb(177, 170, 170);
  padding: 16px;
  text-align: center;
}
</style>

<script setup>
import GlobalMenu from "@/components/GlobalMenu.vue";
</script>
