<template>
  <div id="QuestionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题目">
        <a-input v-model="searchParams.title" placeholder="输入题目名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="0"></a-divider>
    <a-table
      :columns="columns"
      :boder="true"
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
        <a-space style="cursor: pointer">
          <div @click="doQuesitons(record)">{{ record.title }}</div>
        </a-space>
      </template>
      <template #tags="{ record }">
        <a-space>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        <a-space>
          {{
            `${record.submitNum ? record.acceptedNum / record.submitNum : "0"}%`
          }}</a-space
        >
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
} from "@/api";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();

// 数据列表初始化
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  current: 1,
  pageSize: 9,
  title: "",
  tags: [],
});

// 加载数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
    title: "题号",
    dataIndex: "id",
    ellipsis: true,
    tooltip: true,
    width: 100,
  },
  {
    title: "题目名称",
    slotName: "title",
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
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
