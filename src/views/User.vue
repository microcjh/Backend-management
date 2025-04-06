<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
const handleClick = () => {
  console.log("click");
};

const { proxy } = getCurrentInstance();
const tableData = ref([]);
const getUserData = async () => {
  let data = await proxy.$api.getUserData();
  console.log(data);
  //item后面要先加先加（）在{}
  tableData.value = data.list.map((item) => ({
    ...item,
    sex: item.sex === 1 ? "男" : "女",
  }));
};
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sex",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出身日期",
  },
  {
    prop: "addr",
    label: "地址",
    width: 500,
  },
]);
onMounted(() => {
  getUserData();
});
</script>

<template>
  <div class="user-header">
    <el-button type="primary">+新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <!-- 如果这个搜索button不用el-form-item包裹的话，会与input和新增按钮对不齐 -->
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <!-- 数据在tableData里面，tableLabel中是prop和label，
      label表示列头，prop里面的参数必须和tableData中的参数一样，这样才可以渲染出来 -->
      <el-table-column
        v-for="item in tableLabel"
        :prop="item.prop"
        :label="item.label"
        :key="item.label"
      ></el-table-column>
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default>
          <el-button type="primary" size="small" @click="handleClick">
            编辑
          </el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>



