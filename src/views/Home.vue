<script setup>
import { useAllDataStore } from "@/stores";
import { ref, getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();

//pinia
const store = useAllDataStore();

// home下面的数据,使用axios去请求mock制造的假数据
const tableData = ref([]);
const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});

const getTableData = async () => {
  const data = await proxy.$api.getTableData();
  tableData.value = data.tableData;
};

onMounted(() => {
  getTableData();
});
</script>

<template>
  <el-row class="home" :gutter="20">
    <!-- home左侧（包括两个卡片） -->
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="store.getImage('user')" class="user" />
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-human">超级管理员</p>
          </div>
        </div>
        <hr />
        <div class="login-info">
          <p>上次登录时间：<span>2024-5-14</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card class="bottomCard" shadow="hover">
        <el-table :data="tableData" stripe>
          <el-table-column
            v-for="(first, other) in tableLabel"
            :label="first"
            :prop="other"
          />
        </el-table>
      </el-card>
    </el-col>
    <!-- home左侧（包括两个卡片） -->

    <el-col :span="16"> </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.home {
  height: 100%;
  overflow: hidden;
  .user {
    display: flex;
    align-items: center;
    margin-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info {
      line-height: 40px;
      .user-info-admin {
        font-size: 40px;
      }
      .user-info-human {
        color: #999;
      }
    }
  }
  .login-info {
    margin-left: 15px;
    p {
      line-height: 40px;
      color: #999;
      span {
        margin-left: 50px;
        color: #666;
      }
    }
  }
  .bottomCard {
    margin-top: 20px;
  }
}
</style>

