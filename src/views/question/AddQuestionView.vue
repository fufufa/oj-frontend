<template>
  <div id="addQuetionView">创建题目</div>
  <a-form-item field="title" label="标题">
    <a-input v-model="form.title" placeholder="请输入标题"></a-input>
  </a-form-item>
  <a-form :model="form" label-align="left">
    <a-form-item field="anwer" label="答案">
      <MdEditor />
    </a-form-item>
    <a-form-item field="content" label="题目内容">
      <MdEditor />
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag
        v-model="form.tags"
        placeholder="请输入标签"
        allow-clear
      ></a-input-tag>
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
      <a-button>Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { reactive } from "vue";
const form = reactive({
  title: "暴力",
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
</script>

<style scoped></style>
