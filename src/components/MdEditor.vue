<template>
  <div id="mdEditor">
    <Editor :value="contents" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { withDefaults, defineProps } from "vue";
import { Editor } from "@bytemd/vue-next";

/**
 * 定义组件类型
 */
interface Props {
  contents: string;
  handleChange: (v: string) => void;
}
const plugins = [gfm(), highlight()];
const props = withDefaults(defineProps<Props>(), {
  contents: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped></style>
