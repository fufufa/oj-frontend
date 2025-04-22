<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
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
