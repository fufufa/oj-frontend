<template>
  <div id="manageQuestionView">
    <a-table
      :columns="columns"
      :data="dataList"
      :show="show"
      :pagination="{
        showTotal: true,
        total: total,
        current: searchParams.page,
        pageSize: searchParams.pageSize,
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Question, QuestionControllerService } from "@/api";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { Modal } from "@arco-design/web-vue";

const router = useRouter();

// 数据列表初始化
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  page: 1,
  pageSize: 10,
});

// 加载数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    console.log(dataList.value);
    total.value = res.data.total;
  } else {
    Message.error(res.message);
  }
};

const show = ref(true);
onMounted(() => {
  loadData();
});
// 定义表头数据
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

// 修改数据
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

// 删除数据
const doDelete = (question: Question) => {
  Modal.confirm({
    title: "确定删除吗？",
    content: "",
    closable: true,
    onOk: async () => {
      const res = await QuestionControllerService.deleteQuestionUsingPost({
        id: question.id,
      });
      if (res.code === 0) {
        Message.success("删除成功");
        loadData();
      } else {
        Message.error(res.message);
      }
    },
  });
};
</script>
