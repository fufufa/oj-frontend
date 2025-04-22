<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // 引入 particles.js 文件
  import("@/libs/particles.js");
});
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
