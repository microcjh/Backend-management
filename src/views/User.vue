<script setup>
import { ref, reactive, onMounted, getCurrentInstance, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const handleClick = () => {
  console.log("click");
};

const { proxy } = getCurrentInstance();
const tableData = ref([]);
const getUserData = async () => {
  let data = await proxy.$api.getUserData(config);
  //item后面要先加先加（）在{}
  console.log(data);
  tableData.value = data.list.map((item) => ({
    ...item,
    sex: item.sex === "1" ? "男" : "女",
  }));
  config.total = data.count;
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
  },
]);
//实现搜索功能
const formInline = reactive({
  keyword: "",
});
const config = reactive({
  name: "",
  total: 0,
  page: 1,
});
const handerSearch = () => {
  config.name = formInline.keyword;
  getUserData();
};
//实现分页功能
const handleChange = (page) => {
  config.page = page;
  getUserData();
};
//实现删除功能
const handleDelete = (val) => {
  ElMessageBox.confirm("你确定要删除吗").then(async () => {
    await proxy.$api.deleteUser({ id: val.id });
    ElMessage({
      showClose: true,
      message: "删除成功",
      type: "success",
    });
    getUserData();
  });
};
//实现新增功能
const action = ref("add");
const dialogVisible = ref(false);
const formUser = reactive({
  sex: "1",
});
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr: [{ required: true, message: "地址是必填项" }],
});
const handleClose = () => {
  dialogVisible.value = false;
  //重置表单样式
  proxy.$refs["userForm"].resetFields();
};
const handleCancel = () => {
  dialogVisible.value = false;
  proxy.$refs["userForm"].resetFields();
};
const handleAdd = () => {
  dialogVisible.value = true;
  action.value = "add";
};
const onSubmit = () => {
  //validate表单校验
  proxy.$refs["userForm"].validate(async (vaild) => {
    if (vaild) {
      let res = null;
      if (action.value === "add") {
        res = await proxy.$api.addUser(formUser);
      } else {
        res = await proxy.$api.editUser(formUser);
      }
      if (res) {
        dialogVisible.value = false;
        proxy.$refs["userForm"].resetFields();
        getUserData();
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      });
    }
  });
};
//编辑功能
const handleEdit = (val) => {
  action.value = "edit";
  dialogVisible.value = true;
  //在页面渲染完成后调用
  nextTick(() => {
    Object.assign(formUser, { ...val, sex: "" + val.sex });
  });
};
onMounted(() => {
  getUserData();
});
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input
          placeholder="请输入用户名"
          v-model="formInline.keyword"
        ></el-input>
      </el-form-item>
      <!-- 如果这个搜索button不用el-form-item包裹的话，会与input和新增按钮对不齐 -->
      <!-- 这个click事件要绑定到button里面，不能放在input里面 -->
      <el-form-item>
        <el-button type="primary" @click="handerSearch">搜索</el-button>
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
      <el-table-column fixed="right" label="Operations" min-width="80">
        <template #="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <!-- scope.row 是什么？在 <el-table-column> 的插槽 (<template #default="scope">) 中
          ，scope 是一个包含当前行信息的对象。scope.row 就是当前渲染的这一行的完整数据对象，
          它直接对应 tableData 数组中的某一项。 -->
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="handleChange"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  .pager {
    position: absolute;
    right: 10px;
  }
}
.select-clearn {
  display: flex;
}
</style>



