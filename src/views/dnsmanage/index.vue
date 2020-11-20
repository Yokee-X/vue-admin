<!--
 * @Author: Yokee
 * @Date: 2020-11-16 17:47:32
 * @LastEditTime: 2020-11-20 11:43:43
 * @FilePath: \admin\src\views\dnsmanage\index.vue
-->
<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <el-input v-model="search" placeholder="搜索域名" class="input" />
        <el-button type="primary" class="button" @click="searchTemp()"
          >搜索</el-button
        >
      </div>
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="domain.results" border style="width: 100%">
        <el-table-column label="序号" width="80" align="center">
          <template v-slot="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="200">
          <template v-slot="scope">
            <span>{{ changeTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="域名" prop="domain" min-width="250">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="domain"
          min-width="120"
          align="center"
        >
          <template v-slot="scope">
            <div
              @click="
                statusHandler(scope.row.id, scope.row.status == 1 ? -1 : 1)
              "
            >
              <el-switch
                style="display: block"
                :value="!(scope.row.status > 0)"
                active-color="#909399"
                inactive-color="#13ce66"
                active-text="关"
                inactive-text="开"
              >
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120" align="center">
          <template v-slot="scope">
            <el-button @click="open(scope.row.domain)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :page-size="domain.page.limit"
        layout=" prev, pager, next"
        :total="domain.page.total"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
      >
      </el-pagination>
    </div>
    <!-- 添加 -->
    <el-dialog
      title="添加域名"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <el-form>
        <el-form-item label="域名地址" label-width="80px">
          <el-input v-model="domainInput" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createHandler(domainInput)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="统计" :visible.sync="checkVisible" width="90%" center>
      <el-form>
        <el-form-item label="选择时间" label-width="80px">
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
          <el-button type="primary" class="button" @click="checkHandler()"
            >查询</el-button
          >
        </el-form-item>
        <div class="linechart">
          <line-chart :chart-data="chartData" :x-axis="xAxis" />
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createDomain, updataDomain, listDomain, urlLog } from "../../api";
import changeTime from "../../utils/time.js";
import LineChart from "../../components/lineChart";

export default {
  data() {
    return {
      timevalue: [],
      chartData: [],
      xAxis: [],
      checkVisible: false,
      dialogVisible: false,
      currentPage: 1,
      domain: { page: {}, results: [] },
      domainInput: "",
      search: "",
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
      url: "",
    };
  },
  components: {
    LineChart,
  },
  beforeMount() {
    this.listHandler();
  },
  methods: {
    changeTime,
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listHandler(this.currentPage);
    },
    open(url) {
      this.checkVisible = true;
      this.url = url;
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.timevalue = [start, end];
      this.checkHandler();
    },
    async checkHandler() {
      let res = await urlLog({
        start: changeTime(this.timevalue[0]),
        end: changeTime(this.timevalue[1]),
        type: "domainLite",
        url: this.url,
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
    searchTemp() {
      if (this.search == "") {
        this.listHandler();
      } else {
        this.searchHandler();
      }
    },
    async searchHandler() {
      let res = await listDomain({
        where: { domain: `? ${this.search}` },
        order: "id:desc",
      });
      if (res) {
        this.domain = { ...res };
      }
    },
    async listHandler() {
      let res = await listDomain({
        page: this.currentPage,
        order: "id:desc",
      });
      if (res) {
        this.domain = { ...res };
      }
    },
    async statusHandler(id, status) {
      let res = await updataDomain({
        id,
        status,
      });
      if (res) {
        this.listHandler(this.currentPage);
      }
    },
    async createHandler(domain) {
      let res = await createDomain({ domain });
      if (res) {
        this.listHandler(this.currentPage);
        this.dialogVisible = false;
        this.domainInput = "";
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
}
.input {
  width: 250px;
}
.table {
  width: 100%;
  padding: 0 60px;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 30px 60px 50px 0;
}
.button {
  margin: 0 20px;
}
</style>