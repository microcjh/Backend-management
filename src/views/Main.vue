<script setup>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTab from "@/components/CommonTab.vue";
</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 左侧组件 -->
      <common-aside />
      <!-- 左侧组件 -->

      <el-container>
        <!-- 右侧头部组件 -->
        <el-header class="el-header">
          <common-header />
        </el-header>
        <!-- 右侧头部组件 -->
        <common-tab />
        <!-- 主页面处实现路由跳转 -->
        <el-main class="right-main"><router-view></router-view> </el-main>
        <!-- 主页面处实现路由跳转 -->
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout,
.lay-container {
  height: 100%;
}
.el-header {
  background-color: #8b8b87b9;
  border-bottom: 1px solid #333357;
  border-top: 1px solid #333357;
}
</style>