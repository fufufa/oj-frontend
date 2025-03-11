<template>
  <div id="basiclayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalMenu />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basiclayout {
}

#basiclayout .header {
  position: sticky;
  top: 0;
}

#basiclayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  padding: 20px;
  margin-bottom: 16px;
}

#basiclayout .footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
}
</style>

<script setup>
import GlobalMenu from "@/components/GlobalMenu.vue";
</script>
