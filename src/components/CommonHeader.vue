<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "@/stores";
const getImage = (user) =>
  new URL(`../assets/images/${user}.png`, import.meta.url).href;
// import.meta.url 表示当前的绝对路径 href是URL的一个属性，表示一个字符串。

const store = useAllDataStore();
const handleCollapse = () => (store.state.isCollapse = !store.state.isCollapse);
</script>

<template>
  <div class="header">
    <!-- 左侧按钮加面包屑 -->
    <div class="l-content">
      <el-button type="primary" class="icon" @click="handleCollapse">
        <el-icon style="vertical-align: middle">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 左侧按钮加面包屑 -->

    <!-- 右侧头像加下拉菜单 -->
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImage('user')" class="user" />
          <!-- <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 右侧头像加下拉菜单 -->
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
.l-content {
  display: flex;
  align-items: center;
}
.r-content {
  .user {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
}
// 如果您希望样式中的选择器scoped“深入”，即影响子组件，则可以使用:deep()伪类：
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
