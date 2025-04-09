<script setup>
import { reactive, getCurrentInstance } from "vue";
import { useAllDataStore } from "@/stores";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const store = useAllDataStore();
const router = useRouter();
//uncaught (in promise) 网络错误...Understand this error  重新启动服务器
const loginForm = reactive({
  username: "",
  password: "",
});
const handleLogin = async () => {
  const res = await proxy.$api.getMenu(loginForm);
  console.log(res);
  store.updateMenu(res.menuList);
  store.state.token = res.token;
  router.push("/home");
};
</script>

<template>
  <div class="body-login">
    <div class="art-wrapper">
      <img src="../assets/images/login.webp" alt="" />
    </div>
    <div class="content-wrapper">
      <el-form :model="loginForm" class="main-content">
        <img
          src="https://www.freepik.com/v2/assets/freepik.8bacab41.svg"
          alt=""
          class="logo"
        />
        <h1>Create an account</h1>
        <el-form-item>
          <el-input
            type="input"
            placeholder="请输入账号"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="handleLogin"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.body-login {
  width: 100%;
  height: 100%;
  display: flex;
  .art-wrapper {
    flex: 1; //占据剩余的空间
    height: 100%;
    overflow: hidden;
    //标签不用"."
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // 保持图片比例并且覆盖整个区域
    }
  }

  .content-wrapper {
    height: 100%;
    padding: 40px 20px;
    width: 480px;
    padding-left: 80px;
    padding-right: 80px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // position: relative;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    .main-content {
      display: flex;
      width: 400px;
      align-items: center;
      flex-direction: column;
      .el-input {
        width: 300px;
        height: 40px;
      }
      .logo {
        height: 22px;
        margin-bottom: 40px;
        width: auto;
      }
      h1 {
        text-align: center;
        margin-bottom: 40px;
        color: #5b5b5a;
        font-weight: 600;
        font-size: 20px;
      }
    }
  }
}
</style>



