<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <img src="../assets/logo.jpg" alt="" class="loginLogo" />
        <div>登录判题系统</div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
}

#userLayout .header {
  display: flex;
  align-items: center;
  justify-content: center;
}

#userLayout .content {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.loginLogo {
  padding-right: 20px;
  height: 48px;
}
#userLayout .footer {
  padding: 16px;
  text-align: center;
}
</style>

<script setup></script>
