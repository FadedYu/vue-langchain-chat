<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
import LayoutAside from './LayoutAside.vue'
import LayoutFooter from './LayoutFooter.vue'
</script>

<template>
  <el-container class="layout-container">
    <el-header>
      <LayoutHeader></LayoutHeader>
    </el-header>

    <el-container class="layout-body">
      <el-aside>
        <LayoutAside></LayoutAside>
      </el-aside>

      <el-main>
        <el-scrollbar>
          <div class="layout-main">
            <router-view></router-view>
          </div>
          <LayoutFooter class="el-footer" />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-header {
    height: var(--el-header-height);
    padding: 0 10px;
    background-color: var(--el-color-primary-light-5);
  }

  .layout-body {
    height: 0;

    .el-main {
      padding: 0;
      background-color: var(--el-bg-color-page);
    }

    .el-footer {
      background-color: var(--el-bg-color-page);
    }
  }

  .layout-main {
    min-height: calc(
      100vh - var(--el-header-height) - var(--app-content-padding) - var(--app-content-padding) - var(
          --el-footer-height
        )
    );
    padding: 20px;
  }
}
</style>
