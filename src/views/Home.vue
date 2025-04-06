<script setup>
import { useAllDataStore } from "@/stores";
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import * as echarts from "echarts";
const { proxy } = getCurrentInstance();

//pinia
const store = useAllDataStore();

// home左下面的数据,使用axios去请求mock制造的假数据
const tableData = ref([]);
const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});
// home右下面的数据
const chartData = ref([]);
// home右上面的数据
const countData = ref([]);
//监听页面的变化
const observer = ref(null);

//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});

const getTableData = async () => {
  const data = await proxy.$api.getTableData();
  tableData.value = data.tableData;
};
const getCountData = async () => {
  const data = await proxy.$api.getCountData();
  countData.value = data;
};
const getChartData = async () => {
  const { orderData, videoData, userData } = await proxy.$api.getChartData();
  //对第一个图标进行x轴 和 series 赋值
  xOptions.xAxis.data = orderData.date;
  xOptions.series = Object.keys(orderData.data[0]).map((val) => {
    return {
      name: val,
      data: orderData.data.map((item) => item[val]),
      type: "line",
    };
  });
  const oneEchart = echarts.init(proxy.$refs["echart"]);
  oneEchart.setOption(xOptions);

  //对第二个柱状图进行渲染
  xOptions.xAxis.data = userData.map((item) => item.date);
  xOptions.series = [
    {
      name: "新增用户",
      data: userData.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userData.map((item) => item.active),
      type: "bar",
    },
  ];
  const twoEchart = echarts.init(proxy.$refs["userEchart"]);
  twoEchart.setOption(xOptions);

  //对饼状图的渲染
  pieOptions.series = [
    {
      data: videoData,
      type: "pie",
    },
  ];
  const threeEchart = echarts.init(proxy.$refs["videoEchart"]);
  threeEchart.setOption(pieOptions);
};
//监听页面的变化
//如果监听的容器大小发生变化，改变了以后，会执行回调函数
observer.value = new ResizeObserver(() => {
  oneEchart.resize();
  twoEchart.resize();
  threeEchart.resize();
});
//容器存在
if (proxy.$refs["echart"]) {
  observer.value.observe(proxy.$refs["echart"]);
}
onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
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

    <!-- home右侧 -->
    <el-col :span="16">
      <!-- 右上的卡片 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ padding: 0 }"
          shadow="hover"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="money">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 右上的卡片 -->
      <!-- 右下的图表 -->
      <el-card class="top-echart" style="height: 200px" shadow="hover">
        <div ref="echart" style="height: 210px"></div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <div ref="userEchart" style="height: 210px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 210px"></div>
        </el-card>
      </div>
      <!-- 右下的图表 -->
    </el-col>
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
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 65px;
      height: 65px;
    }
    .detail {
      display: inline-block;
      margin-left: 15px;
      .money {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 15px;
        color: #999;
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .el-card {
      width: 58%;
      height: 260px;
    }
  }
}
</style>



