<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
// 左侧菜单数据列表
const list = computed(() => store.state.menuList);
// 左侧菜单数据列表

//过滤出有多级菜单和无多级菜单的列表数据
const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));
//过滤出有多级菜单和无多级菜单的列表数据

const store = useAllDataStore();
const router = useRouter();
const route = useRoute();
//处理刷新时持续选中状态
const activeMenu = computed(() => route.path);
const isCollapse = computed(() => store.state.isCollapse);
const width = computed(() => (store.state.isCollapse ? "64px" : "180px"));
// 实现点击跳转路由
const handleMenu = (item) => {
  router.push(item.path);
  store.addMenu(item);
};
</script>

<template>
  <el-aside :width="width">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activeMenu"
    >
      <!-- background-color="#545c64"
    text-color="#fff" -->
      <!-- 未加之前点击其他会撑开背景颜，导致出现一大坨白色 -->

      <!-- 无子菜单 -->
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <!-- <h3 v-show="isCollapse">后台管理</h3> -->
      <el-menu-item
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path"
        @click="handleMenu(item)"
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
            @click="handleMenu(item)"
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
  </el-aside>
</template>

<style lang="less" scoped>
.icons {
  width: 50px;
  height: 50px;
  margin-right: 7px;
}
.el-menu {
  height: 100%;
  width: 100%;
  border-right: none;
  background-color: #545c64;
  h3 {
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
}
</style>
