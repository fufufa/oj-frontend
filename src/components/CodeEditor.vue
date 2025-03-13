<template>
  <div id="container" ref="codeContainerRef" style="min-height: 400px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted, toRaw, withDefaults, defineProps, watch } from "vue";
const codeContainerRef = ref();
const codeEditor = ref();

/**
 * 定义组件类型
 */
interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

watch([props.language], () => {
  codeEditor.value = monaco.editor.create(codeContainerRef.value, {
    value: props.value,
    language: "java",
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
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});

onMounted(() => {
  codeEditor.value = monaco.editor.create(codeContainerRef.value, {
    value: props.value,
    language: "java",
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
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
