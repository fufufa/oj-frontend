<template>
  <div id="mdEditor">
    <Viewer :value="contents" :plugins="plugins" />
  </div>
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { withDefaults, defineProps } from "vue";
import { Viewer } from "@bytemd/vue-next";

/**
 * 定义组件类型
 */
interface Props {
  contents: string;
}
const plugins = [gfm(), highlight()];
const props = withDefaults(defineProps<Props>(), {
  contents: () => "",
});
</script>

<style scoped></style>
