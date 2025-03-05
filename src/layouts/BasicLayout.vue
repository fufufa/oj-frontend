<template>
  <div id="basiclayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalMenu />
      </a-layout-header>
      <a-layout-content class="content">
        <!-- <router-view /> -->
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
#basiclayout {
}

#basiclayout .header {
  background: #333;
  margin-bottom: 6px;
}

#basiclayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  padding: 20px;
  margin-bottom: 16px;
}

#basiclayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>

<script>
import GlobalMenu from "@/components/GlobalMenu.vue";

export default {
  components: {
    GlobalMenu,
  },
};
</script>
