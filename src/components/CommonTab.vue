<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllDataStore } from "@/stores";

const useTags = useAllDataStore();
// *********//
// 直接引用 (const tags = useTags.state.tags)
// 静态引用：直接获取当前时刻 useTags.state.tags 的值无响应性：当 useTags.state.tags 变化时，tags 不会自动更新
// 使用 computed (const tags = computed(() => useTags.state.tags))
// 响应式引用：自动更新：当 useTags.state.tags 变化时，tags 会自动更新
const tags = computed(() => useTags.state.tags);
// *********//

const route = useRoute();
const router = useRouter();
const handleMenu = (tag) => {
  router.push(tag.name);
  useTags.addMenu(tag);
};
//关闭tab时触发
const handleClose = (tag, index) => {
  //这里执行pinia中的updateTags方法，把这个tab删除掉
  useTags.updateTags(tag);
  //只有当关闭的tab对应当前页面的时候，才需要做一些操作
  if (tag.name !== route.name) return;

  useTags.addMenu(tags.value[index - 1]);
  router.push(tags.value[index - 1].name);
};
</script>

<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      size="large"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  margin: 20px 0 0 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>
