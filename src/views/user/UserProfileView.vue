<template>
  <div class="user-profile">
    <a-card class="profile-card">
      <template #title>
        <div class="card-title">
          <a-typography-title :heading="4">个人中心</a-typography-title>
          <span
            class="home-link"
            title="返回主页"
            @click="goHome"
            style="cursor: pointer"
          >
            <icon-home
              style="font-size: 28px; color: #409eff; vertical-align: middle"
            />
          </span>
        </div>
      </template>
      <a-row :gutter="24">
        <!-- 左侧个人信息 -->
        <a-col :span="12">
          <div class="info-section">
            <div class="info-item">
              <div class="info-label">用户ID</div>
              <div class="info-value">{{ userInfo.id }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">注册时间</div>
              <div class="info-value">
                {{ moment(userInfo.createTime).format("YYYY-MM-DD") }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">最后更新</div>
              <div class="info-value">
                {{ moment(userInfo.updateTime).format("YYYY-MM-DD") }}
              </div>
            </div>
          </div>
        </a-col>
        <!-- 右侧编辑区域 -->
        <a-col :span="12">
          <a-form
            :model="userInfo"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 16 }"
            @submit="handleUpdate"
          >
            <a-form-item field="userName" label="昵称">
              <a-input v-model="userInfo.userName" />
            </a-form-item>
            <a-form-item field="userProfile" label="个人介绍">
              <a-textarea v-model="userInfo.userProfile" :rows="4" />
            </a-form-item>
            <a-form-item :wrapper-col-props="{ span: 16, offset: 6 }">
              <a-button type="primary" html-type="submit">保存修改</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { UserControllerService } from "@/api";
import type { LoginUserVO } from "@/api/models/LoginUserVO";
import type { UserUpdateMyRequest } from "@/api/models/UserUpdateMyRequest";
import moment from "moment";
import { IconHome } from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.push("/questions");
};

const userInfo = ref<LoginUserVO>({
  userName: "",
  userAvatar: "",
  userProfile: "",
});

const loadUserInfo = async () => {
  try {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0 && res.data) {
      userInfo.value = res.data;
    }
  } catch (e) {
    Message.error("获取用户信息失败");
  }
};

const handleUpdate = async () => {
  try {
    const updateRequest: UserUpdateMyRequest = {
      userName: userInfo.value.userName,
      userProfile: userInfo.value.userProfile,
    };
    const res = await UserControllerService.updateMyUserUsingPost(
      updateRequest
    );
    if (res.code === 0) {
      Message.success("更新成功");
      await loadUserInfo();
    } else {
      Message.error("更新失败");
    }
  } catch (e) {
    Message.error("更新失败");
  }
};

onMounted(() => {
  loadUserInfo();
});
</script>

<style scoped>
.user-profile {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80")
    no-repeat center center fixed;
  background-size: cover;
}

.profile-card {
  width: 100%;
  max-width: 1100px;
  min-height: 500px;
  margin: 40px auto;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.95);
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-link {
  margin-left: 16px;
  text-decoration: none;
}

.info-section {
  padding: 20px;
  background-color: var(--color-fill-2);
  border-radius: 4px;
}

.info-item {
  margin-bottom: 16px;
}

.info-label {
  color: var(--color-text-3);
  font-size: 14px;
  margin-bottom: 4px;
}

.info-value {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: 500;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.upload-btn {
  margin-top: 8px;
}
</style>
