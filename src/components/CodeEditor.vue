<template>
  <div id="container" ref="codeContainerRef" style="min-height: 400px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted, toRaw, withDefaults, defineProps } from "vue";
const codeContainerRef = ref();
const codeEditor = ref();

/**
 * 定义组件类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
onMounted(() => {
  codeEditor.value = monaco.editor.create(codeContainerRef.value, {
    value: props.value,
    language: "javascript",
    automaticLayout: true,
    lineNumbers: "on",
    colorDecorators: true, // 颜色装饰器
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });
  codeEditor.value.onDidChangeModelContent(() => {
    console.log("目前内容为：", toRaw(codeEditor.value).getValue());
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
