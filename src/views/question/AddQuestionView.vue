<template>
  <div id="addQuetionView">创建题目</div>
  <a-form :model="form" label-align="left">
    <a-form-item field="title" label="标题">
      <a-input v-model="form.title" placeholder="请输入标题"></a-input>
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag
        v-model="form.tags"
        placeholder="请输入标签"
        allow-clear
      ></a-input-tag>
    </a-form-item>
    <a-form-item field="anwer" label="答案">
      <MdEditor />
    </a-form-item>
    <a-form-item field="content" label="题目内容">
      <MdEditor />
    </a-form-item>
    <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
      <a-space direction="vertical" style="min-width: 480px">
        <a-form-item field="judgeConfig.timeLimit" label="时间限制">
          <a-input-number
            v-model="form.judgeConfig.timeLimit"
            placeholder="请输入时间限制"
            mode="button"
            :min="0"
            size="large"
          />
        </a-form-item>
        <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
          <a-input-number
            v-model="form.judgeConfig.memoryLimit"
            placeholder="请输入时间限制"
            mode="button"
            :min="0"
            size="large"
          />
        </a-form-item>
        <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
          <a-input-number
            v-model="form.judgeConfig.stackLimit"
            placeholder="请输入时间限制"
            mode="button"
            :min="0"
            size="large"
          />
        </a-form-item>
      </a-space>
    </a-form-item>
    <a-form-item
      v-for="(judgeCaseItem, index) of form.judgeCase"
      :label="`测试用例-${index}`"
      :key="index"
    >
      <a-space direction="vertical" style="min-width: 480px">
        <a-form-item
          :field="`form.judgeCase[${index}].input`"
          :label="`输入测试用例`"
        >
          <a-input v-model="judgeCaseItem.input" placeholder="输入测试用例" />
        </a-form-item>
        <a-form-item
          :field="`form.judgeCase[${index}].output`"
          :label="`输出测试用例`"
        >
          <a-input v-model="judgeCaseItem.output" placeholder="输出测试用例" />
        </a-form-item>
        <a-button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
          >删除</a-button
        >
      </a-space>
    </a-form-item>
    <a-form-item>
      <a-button @click="handleAdd">新增测试用例</a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="doSubmit">{{
        updatePage ? "更新" : "提交"
      }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { QuestionControllerService } from "@/api";
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// 表单数据
const form = reactive({
  title: "",
  answer: "",
  content: "",
  tags: [],
  judgeCase: [
    {
      input: "",
      output: "",
    },
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
});
/**
 * 根据题目id加载数据
 */
const loadData = async () => {
  const id = route.query.id;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );

  if (res.code === 0) {
    form.id = res.data?.id as any;
    form.title = res.data?.title as string;
    form.answer = res.data?.answer as string;
    form.content = res.data?.content as string;
    form.tags = JSON.parse(res.data?.tags as string);
    form.judgeCase = JSON.parse(res.data?.judgeCase as string);
    form.judgeConfig = JSON.parse(res.data?.judgeConfig as string);
    console.log("res", form);
  } else {
    Message.error(res.message as string);
  }
};

// 是否是更新页面
const updatePage = route.path.includes("update");
if (updatePage) {
  // 更新页面需要初始化数据
  loadData();
}

/**
 * 删除测试用例
 * @param index
 */
const handleDelete = (index: number) => {
  if (form.judgeCase.length === 1) {
    Message.error("至少需要一个测试用例");
    return;
  }
  form.judgeCase.splice(index, 1);
};
/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
/**
 * 提交
 */
const doSubmit = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(form);
    if (res.code === 0) {
      Message.success("更新成功");
    } else {
      Message.error("更新失败", res.message);
    }
    return;
  }
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code === 0) {
    Message.success("提交成功");
  } else {
    Message.error("添加失败", res.message);
  }
};
</script>

<style scoped></style>
