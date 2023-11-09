<script setup lang="ts">
import LayoutContainer from './components/base/LayoutContainer.vue'
</script>

<template>
  <section class="container">
    <LayoutContainer></LayoutContainer>
    <el-backtop :right="100" :bottom="100" />
  </section>
</template>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
