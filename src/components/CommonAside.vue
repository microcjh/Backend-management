    <script setup>
import { ref, computed } from "vue";
// 左侧菜单数据列表
const list = ref([
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "house",
    url: "Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "Mall",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "User",
  },
  {
    path: "other",
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Page1",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Page2",
      },
    ],
  },
]);
// 左侧菜单数据列表

//过滤出有多级菜单和无多级菜单的列表数据
const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));
//过滤出有多级菜单和无多级菜单的列表数据
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
  >
    <!-- background-color="#545c64"
    text-color="#fff" -->
    <!-- 未加之前点击其他会撑开背景颜，导致出现一大坨白色 -->

    <!-- 无子菜单 -->
    <h3>通用后台管理系统</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
    >
      <el-icon class="icons">
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <!-- 无子菜单 -->

    <!-- 有子菜单 -->
    <el-sub-menu
      v-for="item in hasChildren"
      :key="item.path"
      :index="item.path"
    >
      <template #title>
        <el-icon class="icons">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </template>

      <el-menu-item-group>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          <el-icon class="icons">
            <component :is="child.icon"></component>
          </el-icon>
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 有子菜单 -->
  </el-menu>
</template>

<style lang="less" scoped>
.icons {
  width: 50px;
  height: 50px;
  margin-right: 7px;
}
.el-menu {
  height: 100%;
  border-right: none;
  background-color: #545c64;
  h3 {
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
}
</style>
