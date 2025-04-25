<template>
  <div id="manageQuestionView">
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
      <template #id="{ record }">
        <a-typography-text ellipsis style="margin-bottom: 0">
          {{ record.id }}
        </a-typography-text>
      </template>
      <template #title="{ record }">
        <a-typography-text ellipsis style="margin-bottom: 0">
          {{ record.title }}
        </a-typography-text>
      </template>
      <template #content="{ record }">
        <a-typography-text
          ellipsis
          style="cursor: pointer; margin-bottom: 0"
          @click="
            () => {
              contentVisible = true;
              contentData = record.content;
            }
          "
        >
          {{ record.content }}
        </a-typography-text>
      </template>
      <template #tags="{ record }">
        <div style="display: flex; flex-wrap: nowrap">
          <a-tag
            v-for="item in JSON.parse(record.tags)"
            :key="item"
            color="green"
            >{{ item }}</a-tag
          >
        </div>
      </template>
      <template #answer="{ record }">
        <a-typography-text
          ellipsis
          style="cursor: pointer; margin-bottom: 0"
          @click="
            () => {
              answerVisible = true;
              answerData = record.answer;
            }
          "
        >
          {{ record.answer }}
        </a-typography-text>
      </template>
      <template #userId="{ record }">
        <a-typography-text ellipsis style="margin-bottom: 0">
          {{ record.userId }}
        </a-typography-text>
      </template>
      <template #createTime="{ record }">
        <a-space>{{ moment(record.createTime).format("YYYY-MM-DD") }} </a-space>
      </template>
      <template #judgeConfig="{ record }">
        <a-typography-text
          ellipsis
          style="cursor: pointer; margin-bottom: 0"
          @click="
            () => {
              jsonData = JSON.parse(record.judgeConfig);
              jsonVisible = true;
            }
          "
        >
          {{ record.judgeConfig }}
        </a-typography-text>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>

          <a-button status="danger" @click="() => (deleteVisible = true)"
            >删除</a-button
          >
          <a-modal
            :visible="deleteVisible"
            @ok="doDelete(record)"
            @cancel="() => (deleteVisible = false)"
            hide-title
          >
            <a-alert type="warning">确定删除改题目吗？</a-alert>
          </a-modal>
        </a-space>
      </template>
    </a-table>
    <a-modal
      width="auto"
      :visible="contentVisible"
      @cancel="() => (contentVisible = false)"
    >
      <div>
        <md-viewer :contents="contentData"></md-viewer>
      </div>
      <template #footer><div></div> </template>
    </a-modal>
    <a-modal
      width="auto"
      :visible="answerVisible"
      @cancel="() => (answerVisible = false)"
    >
      <div>
        <md-viewer :contents="answerData"></md-viewer>
      </div>
      <template #footer><div></div> </template>
    </a-modal>
    <a-modal :visible="jsonVisible" @cancel="() => (jsonVisible = false)">
      <div style="display: flex; justify-content: center">
        <a-space direction="vertical">
          <a-space v-for="(value, key) in jsonData" :key="key">
            <a-typography-text style="width: 200px">{{
              key
            }}</a-typography-text>
            <a-input-number
              :style="{ width: '150px' }"
              :default-value="value"
              class="input-demo"
              disabled
            />
          </a-space>
        </a-space>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Question, QuestionControllerService } from "@/api";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { Modal } from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
import moment from "moment";
import { json } from "body-parser";

const router = useRouter();

// 控制对话框显示
// 内容的
const contentVisible = ref(false);
const contentData = "";
// 答案的
const answerVisible = ref(false);
const answerData = "";
// 删除的
const deleteVisible = ref(false);
// json数据化的
const jsonVisible = ref(false);
// json数据
const jsonData = ref();

// 数据列表初始化
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  current: 1,
  pageSize: 5,
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
    slotName: "id",
    width: 100,
  },
  {
    title: "标题",
    slotName: "title",
    width: 100,
  },
  {
    title: "内容",
    slotName: "content",
    width: 200,
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "答案",
    slotName: "answer",
    width: 200,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 100,
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    width: 100,
  },
  {
    title: "用户id",
    slotName: "userId",
    width: 100,
  },
  {
    title: "创建时间",
    slotName: "createTime",
    width: 200,
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
    width: 200,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 200,
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
 * 更新数据
 * @param question
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

/**
 * 删除数据
 * @param question
 */
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
