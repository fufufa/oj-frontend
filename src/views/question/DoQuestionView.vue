<template>
  <div id="DoQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目描述">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question?.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question?.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question?.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :contents="question?.content || ''" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="userAnwer" title="题解">
            <a-card> 快来评论啊 </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="language" label="语言">
            <a-select
              v-model="form.language"
              default-value="java"
              placeholder="选择语言名称"
              @change="() => console.log(form.language)"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form?.code ?? ''"
          :language="form?.language ?? 'java'"
          :handleChange="onHandleChange"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  QuestionVO,
  QuestionControllerService,
  QuestionSubmitAddRequest,
} from "@/api";
import { Message } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const route = useRoute();
const router = useRouter();
const id = route.query.id;
// 数据列表初始化
const question = ref<QuestionVO>();
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: '\npublic class Main {\n  public static void main(String[] args) {\n    int a = Integer.parseInt(args[0]);\n    int b = Integer.parseInt(args[1]);\n    System.out.println("结果：" + (a + b));\n  }\n}',
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    Message.error(res.message as string);
  }
};
// 加载数据
onMounted(() => {
  loadData();
});

/**
 * 提交代码
 */
const onSubmit = async () => {
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: id as any,
  });
  if (res.code === 0) {
    Message.success("提交成功");
    router.push({
      path: "/questionsSubmit",
    });
  } else {
    Message.error(res.message);
  }
};

const onHandleChange = (v: string) => {
  form.value.code = v;
};
</script>
