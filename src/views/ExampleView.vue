<template>
  <div id="exampleView">
    <CodeEditor :value="content" :handle-change="onChange" />
    <MdEditor :contents="content" :handle-change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";
// 处理文档编辑器
const content = ref("");
const handleChange = (v: string) => {
  content.value = v;
};

// 处理代码编辑器
const value = ref("");
const onChange = (v: string) => {
  value.value = v;
};
</script>
