<template>
  <div class="hero">
    <LoginCanvas></LoginCanvas>
    <div class="main-box">
      <div class="form-box">
        <div id="after" ref="afterRef"></div>
        <div class="button-box">
          <div id="btn" ref="btnRef"></div>
          <button
            id="log"
            ref="logRef"
            type="button"
            class="toggle-btn"
            :onclick="loginOperation"
          >
            登录
          </button>
          <button
            id="reg"
            type="button"
            class="toggle-btn"
            ref="regRef"
            :onclick="registerOperation"
          >
            注册
          </button>
        </div>
        <form id="login" ref="loginRef" class="input-group">
          <input
            type="text"
            v-model="loginForm.userAccount"
            class="input-field"
            placeholder="账号"
            required
          />
          <input
            id="pwd"
            type="Password"
            v-model="loginForm.userPassword"
            class="input-field"
            placeholder="密码"
            required
          />
          <input
            type="button"
            @click="handleLoginSubmit"
            class="submit-btn"
            value="登录"
          />
        </form>
        <form id="register" ref="registerRef" class="input-group">
          <input
            type="text"
            v-model="registerForm.userAccount"
            class="input-field"
            placeholder="账号"
            required
          />
          <input
            type="password"
            v-model="registerForm.userPassword"
            class="input-field"
            placeholder="密码"
            required
          />
          <input
            type="Password"
            v-model="registerForm.checkPassword"
            @input="checkPassword"
            class="input-field"
            placeholder="二次密码"
            required
          />
          <span style="color: rgb(255, 100, 100)" v-show="samePassword"
            >两次密码输入不一致</span
          >
          <input
            type="button"
            class="submit-btn"
            value="Register"
            @click="handleRegisterSubmit"
          />
        </form>
      </div>
      <span class="sp sp-t"></span>
      <span class="sp sp-r"></span>
      <span class="sp sp-b"></span>
      <span class="sp sp-l"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService } from "@/api";
import { reactive, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LoginCanvas from "@/components/LoginCanvas.vue";
const loginForm = reactive({
  userAccount: "",
  userPassword: "",
});
const registerForm = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
const router = useRouter();
const store = useStore();
const samePassword = ref(false);
const handleLoginSubmit = async () => {
  // 校验是否有账号密码，没有不去发请求
  if (!loginForm.userAccount && !loginForm.userPassword) {
    return;
  }
  const res = await UserControllerService.userLoginUsingPost(loginForm);
  if (res.code === 0) {
    message.success("登录成功 3秒后跳转到首页");
    await store.dispatch("getLoginUser");
    setTimeout(() => {
      router.push({
        path: "/questions",
        replace: true,
      });
    }, 3000);
  } else {
    message.error("登录失败" + res.message);
  }
};

const handleRegisterSubmit = async () => {
  if (
    !registerForm.userAccount &&
    !registerForm.userPassword &&
    !registerForm.checkPassword
  ) {
    return;
  }
  const res = await UserControllerService.userRegisterUsingPost(registerForm);
  if (res.code === 0) {
    message.success("注册成功，请登录");
    loginOperation();
    registerForm.userAccount = "";
    registerForm.userPassword = "";
    registerForm.checkPassword = "";
  } else {
    message.error("注册失败" + res.message);
  }
};

const checkPassword = () => {
  if (registerForm.userPassword === registerForm.checkPassword) {
    samePassword.value = false;
  } else {
    samePassword.value = true;
  }
};

const loginRef = ref();
const registerRef = ref();
const btnRef = ref();
const logRef = ref();
const regRef = ref();
const afterRef = ref();

const loginOperation = () => {
  loginRef.value.style.left = "0px";
  registerRef.value.style.left = "500px";
  btnRef.value.style.left = "0px";
  regRef.value.style.color = "rgb(234, 234, 235)";
  logRef.value.style.color = "#252525";
  afterRef.value.style.left = "50%";
  afterRef.value.style.top = "0";
};

const registerOperation = () => {
  loginRef.value.style.left = "-500px";
  registerRef.value.style.left = "0px";
  btnRef.value.style.left = "110px";
  logRef.value.style.color = "rgb(234, 234, 235)";
  regRef.value.style.color = "#252525";
  afterRef.value.style.left = "0";
  afterRef.value.style.top = "0";
};
</script>

<style scoped>
.loginCard {
  width: 400px;
  margin: 50px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
}

.cardTitle {
  text-align: center;
  margin-bottom: 24px;
  color: #1d2129;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.form {
  margin-bottom: 20px;
}

.loginBtn {
  margin-top: 10px;
}

.agreement {
  text-align: center;
  color: var(--color-text-2);
}
.agreement span {
  margin: 0 4px;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.hero {
  min-height: 100vh;
  width: 100%;
  /* 	background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url("https://scontent.fevn1-4.fna.fbcdn.net/v/t1.15752-9/165984071_158329889479551_1593290576845591697_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=ae9488&_nc_ohc=64S5uMrd1CUAX9sL5-X&_nc_ht=scontent.fevn1-4.fna&oh=c327aa21f0a1626266c3d9a28decd654&oe=60870508"); */
  background: #1b1b1b;
  /* 	background-position: center;
	background-size: cover; */
  position: absolute;
}
div {
  box-sizing: border-box;
}
/*main box*/
.main-box {
  width: 320px;
  height: 480px;
  position: relative;
  margin: 6% auto;
  background: #1b1b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.sp {
  position: absolute;
  transition: 0.5s;
}
.sp-t {
  top: 0;
  right: 0;
  width: 200px;
  height: 2px;
  background: linear-gradient(to left, transparent, #57aab4, #57aab4);
  animation: anim2 2s linear infinite;
  transform: translateY(-300%);
  animation-delay: 0.8s;
}
.sp-r {
  bottom: 0;
  right: 0;
  width: 2px;
  height: 200px;
  background: linear-gradient(to top, transparent, #57aab4, #57aab4);
  animation: anim1 2s linear infinite;
  animation-delay: 0s;
}
.sp-b {
  right: 0;
  bottom: 0;
  width: 200px;
  height: 2px;
  background: linear-gradient(to left, transparent, #57aab4, #57aab4);
  animation: anim2 2s linear infinite;
}
.sp-l {
  left: 0;
  top: 0;
  width: 2px;
  height: 200px;
  background: linear-gradient(to top, transparent, #57aab4, #57aab4);
  animation: anim1 2s linear infinite;
  animation-delay: 1s;
  transform: translateX(-300%);
}
@keyframes anim1 {
  0% {
    transform: translateY(300%);
  }
  100% {
    transform: translateY(-300%);
  }
}
@keyframes anim2 {
  0% {
    transform: translateX(300%);
  }
  100% {
    transform: translateX(-300%);
  }
}
/*main box end*/

.form-box {
  width: 316px;
  height: 476px;
  position: relative;
  background: #252525;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;

  overflow: hidden;
  z-index: 5;
}
#after {
  width: 50%;
  height: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  background: #2d2e30;
  z-index: -1;
  transition: 0.5s;
}
.button-box {
  width: 220px;
  margin: 35px auto 30px auto;
  position: relative;

  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  animation: animBTN 5s linear infinite;
}

@keyframes animBTN {
  0% {
    box-shadow: 0 0 10px 9px rgba(3, 169, 244, 0.3);
  }
  33% {
    box-shadow: 0 0 10px 9px rgba(244, 65, 165, 0.3);
  }
  66.9% {
    box-shadow: 0 0 10px 9px rgba(255, 235, 59, 0.3);
  }
  100% {
    box-shadow: 0 0 10px 9px rgba(3, 169, 244, 0.3);
  }
}
.toggle-btn {
  padding: 10px 30px;
  cursor: pointer;
  background: transparent;
  border: 0;
  font-size: 14px;
  font-weight: bold;
  color: rgb(234, 234, 235);
  outline: none;
  position: relative;
  transition: 0.5s;
}
#btn {
  position: absolute;
  top: 0;
  left: 0;

  width: 110px;
  height: 100%;
  background: linear-gradient(to left, #57aab4, #57aab4);
  border-radius: 30px;
  transition: 0.5s;
}
.cont-icon {
  color: #57aab4;
  font-size: 28px;
  transition: transform 0.5s;
}

.icon-link:hover .cont-icon {
  transform: scale(0.95);
}

.input-group {
  width: 320px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  top: 180px;
  position: absolute;
  padding: 0 30px;
  transition: 0.5s;
  box-sizing: border-box;
}
.input-field {
  width: 100%;
  padding: 10px 5px;
  margin: 10px 0;
  border-top: 0;
  border-left: 2px solid #57aab4;
  border-right: 0;
  border-bottom: 2px solid #57aab4;
  outline: none;
  background: transparent;
  color: rgb(234, 234, 235);
  font-size: 15px;
  transition: 0.5s;
}
.input-field:focus {
  border-left: 2px solid transparent;

  border-bottom: 2px solid transparent;
  animation: animINP 5s linear infinite, animBTN 5s linear infinite;
}

.submit-btn {
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: 30px auto 0 auto;
  background: linear-gradient(to right, #03a9f4, #57aab4, #03a9f4);
  border: 0;
  outline: none;
  border-radius: 30px;
  position: relative;
  z-index: 5;
  box-sizing: border-box;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  transition: 0.5s;
}
.submit-btn:hover {
  background: #57aab4;
  color: #fff;
  border-radius: 30px;
  box-shadow: 0 0 5px #57aab4, 0 0 25px #57aab4, 0 0 50px #57aab4,
    0 0 100px #03e9f4;
}

.span {
  margin: 20px 0;
  color: rgb(234, 234, 235);
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*position: absolute;
 	bottom: 88px;*/
}
.check-box {
  margin: 0 10px;
  padding: 0;
}

#login {
  left: 0px;
}
#register {
  left: 500px;
}

@keyframes a {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}

@keyframes animBTN {
  0% {
    box-shadow: 0 0 10px 9px rgba(3, 169, 244, 0.3);
  }
  33% {
    box-shadow: 0 0 10px 9px rgba(244, 65, 165, 0.3);
  }
  66.9% {
    box-shadow: 0 0 10px 9px rgba(255, 235, 59, 0.3);
  }
  100% {
    box-shadow: 0 0 10px 9px rgba(3, 169, 244, 0.3);
  }
}
</style>
