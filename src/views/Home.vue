<script setup>
import { useAllDataStore } from "@/stores";
const store = useAllDataStore();
</script>

<template>
  <el-row class="home" :gutter="20">
    <el-col style="margin-top=20px" :span="8">
      <el-card>
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
      <el-card class="bottomCard"> </el-card>
    </el-col>
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
}
</style>