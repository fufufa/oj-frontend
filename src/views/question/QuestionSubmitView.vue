<template>
  <div id="QuestionsSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题目Id">
        <a-input v-model="searchParams.questionId" placeholder="输入题目id" />
      </a-form-item>
      <a-form-item field="tags" label="编程语言">
        <a-select
          v-model="searchParams.language"
          default-value="java"
          placeholder="选择语言名称"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="0"></a-divider>
    <a-table
      :columns="columns"
      :data="dataList"
      :show="show"
      :pagination="{
        showTotal: true,
        total: total,
        current: searchParams.current,
        pageSize: searchParams.pageSize,
      }"
      @page-change="onPageChange"
    >
      <template #title="{ record }">
        <a-space>
          <div @click="doQuesitons(record)">{{ record.questionId }}</div>
        </a-space>
      </template>
      <template #judgeInfo="{ record }">
        <a-space>
          {{ JSON.stringify(record.judgeInfo) }}
        </a-space>
      </template>
      <template #createTime="{ record }">
        <a-space>{{ moment(record.createTime).format("YYYY-MM-DD") }} </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionSubmitQueryRequest,
} from "@/api";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();

// 数据列表初始化
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  current: 1,
  pageSize: 10,
  questionId: undefined,
  language: "",
  sortField: "createTime",
  sortOrder: "descend",
});

// 加载数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
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
    title: "题交号",
    dataIndex: "id",
  },
  {
    title: "题目id",
    dataIndex: "questionId",
  },
  {
    title: "提交语言",
    dataIndex: "language",
  },
  {
    title: "提交状态",
    dataIndex: "status",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "提交者id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

/**
 * 分页改变
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value.current = page;
  loadData();
};

/**
 * 跳转做题页面
 * @param qustion
 */
const doQuesitons = (qustion: Question) => {
  router.push({
    path: "/view/question",
    query: {
      id: qustion.id,
    },
  });
};

/**
 * 提交查询
 */
const onSubmit = () => {
  searchParams.value.current = 1;
  loadData();
};
</script>
