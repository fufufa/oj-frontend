<template>
  <div class="userLogin">
    <a-form
      :model="form"
      label-align="left"
      :style="{ width: '480px' }"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService } from "@/api";
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const form = reactive({
  userAccount: "",
  userPassword: "",
});
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    message.success("登录成功 3秒后跳转到首页");
    await store.dispatch("getLoginUser");
    setTimeout(() => {
      router.push({
        path: "/",
        replace: true,
      });
    }, 3000);
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>
