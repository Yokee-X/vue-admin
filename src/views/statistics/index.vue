<!--
 * @Author: Yokee
 * @Date: 2020-11-16 17:19:16
 * @LastEditTime: 2020-11-25 10:27:22
 * @FilePath: \admin\src\views\statistics\index.vue
-->
<template>
  <div class="container">
    <span class="title">每日统计</span>
    <div>
      <el-date-picker
        v-model="timevalue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button type="primary" class="button" @click="sysHandler()"
        >查询</el-button
      >
    </div>

    <div class="linechart">
      <line-chart :chart-data="chartData" :x-axis="xAxis" />
    </div>
  </div>
</template>
<script>
import LineChart from "../../components/lineChart";
import { sysLog } from "../../api";
import changeTime from "../../utils/time";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      timevalue: [],
      chartData: [],
      xAxis: [],
    };
  },
  components: {
    LineChart,
  },
  beforeMount() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.timevalue = [start, end];
    this.sysHandler();
  },
  methods: {
    async sysHandler() {
      let res = await sysLog({
        start: changeTime(this.timevalue[0]),
        end: changeTime(this.timevalue[1]),
        type: "domainRef",
      });
      if (res.length != 0) {
        this.chartData = [];
        this.xAxis = [];
        for (let i in res) {
          this.chartData.push(res[i].num);
          this.xAxis.push(res[i].day);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
}
.title {
  display: inline-block;
  font-size: 28px;
  margin: 30px 0;
}
.linechart {
  width: 100%;
  padding: 16px 0 50px 0;
  margin-left: -20px;
}
.button {
  margin: 0 20px;
}
.select {
  margin: 0 0 0 20px;
}
</style>