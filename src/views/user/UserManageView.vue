<template>
  <div class="user-manage">
    <a-card>
      <template #title>
        <div class="card-title">
          <a-typography-title :heading="4">用户管理</a-typography-title>
          <a-button type="primary" @click="showAddModal">添加用户</a-button>
        </div>
      </template>
      <a-table
        :columns="columns"
        :data="userList"
        :pagination="pagination"
        :loading="loading"
        @page-change="handleTableChange"
      >
        <template #userRole="{ record }">
          <a-tag :color="getRoleColor(record.userRole)">
            {{ record.userRole }}
          </a-tag>
        </template>
        <template #createTime="{ record }">
          <span>{{ moment(record.createTime).format("YYYY-MM-DD") }}</span>
        </template>
        <template #action="{ record }">
          <a-space v-if="record.userRole !== 'admin'">
            <a-button type="text" @click="showEditModal(record)">编辑</a-button>
            <a-button type="text" status="danger" @click="handleDelete(record)"
              >删除</a-button
            >
          </a-space>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item field="userName" label="用户名">
          <a-input v-model="formState.userName" />
        </a-form-item>
        <a-form-item field="userAccount" label="用户账号">
          <a-input v-model="formState.userAccount" />
        </a-form-item>
        <a-form-item field="userPassword" label="用户密码">
          <a-button
            v-if="modalTitle == '编辑用户' && !isEditPassword"
            type="primary"
            @click="() => (isEditPassword = true)"
            >需要修改密码</a-button
          >
          <a-space v-else direction="vertical" style="width: 100%">
            <a-input v-model="formState.userPassword" />
            <a-alert type="warning" v-if="isEditPassword"
              >该操作会直接覆盖之前的密码，如果不想请点击覆盖<a-button
                type="text"
                @click="() => (isEditPassword = false)"
                >取消</a-button
              ></a-alert
            >
          </a-space>
        </a-form-item>
        <a-form-item field="userRole" label="用户角色">
          <a-select v-model="formState.userRole">
            <a-option value="user">普通用户</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { UserControllerService } from "@/api";
import type { User } from "@/api/models/User";
import type { UserAddRequest } from "@/api/models/UserAddRequest";
import type { UserUpdateRequest } from "@/api/models/UserUpdateRequest";
import type { DeleteRequest } from "@/api/models/DeleteRequest";
import moment from "moment";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "userName",
  },
  {
    title: "用户账号",
    dataIndex: "userAccount",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
    slotName: "userRole",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "action",
  },
];

const userList = ref<User[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const modalTitle = ref("");
const formRef = ref();
const isEdit = ref(false);
const isEditPassword = ref(false);

const formState = reactive({
  id: undefined as number | undefined,
  userName: "",
  userAccount: "",
  userPassword: "",
  userRole: "",
});

const rules = {
  userName: [{ required: true, message: "请输入用户名" }],
  userAccount: [{ required: true, message: "请输入用户账号" }],
  userRole: [{ required: true, message: "请选择用户角色" }],
};

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "red";
    case "user":
      return "blue";
    default:
      return "default";
  }
};

const loadUserList = async () => {
  loading.value = true;
  try {
    const res = await UserControllerService.listUserByPageUsingPost({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    if (res.code === 0 && res.data) {
      userList.value = res.data.records || [];
      pagination.total = res.data.total || 0;
    }
  } catch (e) {
    Message.error("获取用户列表失败");
  }
  loading.value = false;
};

const handleTableChange = (current: number) => {
  pagination.current = current;
  loadUserList();
};

const showAddModal = () => {
  modalTitle.value = "添加用户";
  isEdit.value = false;
  formState.id = undefined;
  formState.userName = "";
  formState.userAccount = "";
  formState.userRole = "";
  formState.userPassword = "";
  modalVisible.value = true;
};

const showEditModal = (record: User) => {
  modalTitle.value = "编辑用户";
  isEdit.value = true;
  formState.id = record.id;
  formState.userName = record.userName || "";
  formState.userAccount = record.userAccount || "";
  formState.userRole = record.userRole || "";
  modalVisible.value = true;
};

const handleModalOk = async () => {
  try {
    await formRef.value.validate();
    if (isEdit.value) {
      const updateRequestNotPassword: UserUpdateRequest = {
        id: formState.id,
        userName: formState.userName,
        userRole: formState.userRole,
        userAccount: formState.userAccount,
      };
      const updateRequestHavePassword: UserUpdateRequest = {
        id: formState.id,
        userName: formState.userName,
        userRole: formState.userRole,
        userAccount: formState.userAccount,
        userPassword: formState.userPassword,
      };
      const updateRequest = isEditPassword.value
        ? updateRequestHavePassword
        : updateRequestNotPassword;
      const res = await UserControllerService.updateUserUsingPost(
        updateRequest
      );
      if (res.code === 0) {
        Message.success("更新成功");
        modalVisible.value = false;
        isEditPassword.value = false;
        loadUserList();
      } else {
        Message.error("更新失败");
        isEditPassword.value = false;
      }
    } else {
      const addRequest: UserAddRequest = {
        userName: formState.userName,
        userAccount: formState.userAccount,
        userRole: formState.userRole,
        userPassword: formState.userPassword,
      };
      const res = await UserControllerService.addUserUsingPost(addRequest);
      if (res.code === 0) {
        Message.success("添加成功");
        modalVisible.value = false;
        loadUserList();
      } else {
        Message.error("添加失败");
      }
    }
  } catch (e) {
    Message.error("操作失败");
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
};

const handleDelete = async (record: User) => {
  try {
    const deleteRequest: DeleteRequest = {
      id: record.id,
    };
    const res = await UserControllerService.deleteUserUsingPost(deleteRequest);
    if (res.code === 0) {
      Message.success("删除成功");
      loadUserList();
    } else {
      Message.error("删除失败");
    }
  } catch (e) {
    Message.error("删除失败");
  }
};

onMounted(() => {
  loadUserList();
});
</script>

<style scoped>
.user-manage {
  padding: 24px;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
