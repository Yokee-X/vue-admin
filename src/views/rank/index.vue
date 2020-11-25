<!--
 * @Author: Yokee
 * @Date: 2020-11-17 11:40:13
 * @LastEditTime: 2020-11-25 10:24:32
 * @FilePath: \admin\src\views\rank\index.vue
-->
<template>
  <div class="container">
    <div class="rank-header">
      <span class="title"
        >5分钟内：<span class="title-num" v-cloak>{{ mi5 }}</span> 人</span
      >
      <span class="title"
        >1分钟内：<span class="title-num" v-cloak>{{ mi1 }}</span> 人</span
      >
    </div>
    <div class="rank-table">
      <div class="table">
        <span class="table-header">来源排行</span>
        <el-table :data="domain.results" border style="width: 100%">
          <el-table-column prop="url" label="URL" min-width="100%">
          </el-table-column>
          <el-table-column prop="num" label="次数" min-width="100%">
          </el-table-column>
        </el-table>
        <div class="pagin">
        <el-pagination  :page-size="domain.page.limit" layout="prev, pager, next" background :total="domain.page.total">
        </el-pagination>
        </div>
      </div>
      <div class="table">
        <span class="table-header">域名排行</span>
        <el-table :data="source.results" border style="width: 100%">
          <el-table-column prop="url" label="URL" min-width="100%">
          </el-table-column>
          <el-table-column prop="num" label="次数" min-width="100%">
          </el-table-column>
        </el-table>
        <div  class="pagin">
        <el-pagination :page-size="source.page.limit" layout="prev, pager, next" background :total="source.page.total">
        </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { countMi, topRef, topLite } from "../../api/index";
export default {
  data() {
    return {
      mi1: 0,
      mi5: 0,
      domain: { page: {}, results: [] },
      source: { page: {}, results: [] },
      timer1: null,
      timer2: null,
    };
  },
  beforeMount() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.countHandler();
    this.liteHandler();
    this.refHandler();
    setTimeout(() => {
      loading.close();
    }, 1000);
  },
  mounted() {
    this.timer1 = setInterval(() => {
      this.countHandler();
    }, 1000);
    this.timer2 = setInterval(() => {
      this.liteHandler();
      this.refHandler();
    }, 20000);
  },
  beforeDestroy() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    this.timer1 = null;
    this.timer2 = null;
  },
  methods: {
    countHandler: async function () {
      let res = await countMi();
      if (res) {
        this.mi1 = res.mi1IP;
        this.mi5 = res.mi5IP;
      }
    },
    liteHandler: async function (page = 1) {
      let res = await topLite({
        page,
      });
      if (res) {
        this.source = {...res};
      }
    },
    async refHandler(page = 1) {
      let res = await topRef({
        page,
      });
      if (res) {
        this.domain = {...res}
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.rank-header {
  width: 100%;
  height: 100px;
  padding: 0 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(51, 51, 51, 0.05);
  min-width: 1200px;
}
.title {
  font-size: 26px;
  display: inline-block;
  vertical-align: unset;
}
.title-num {
  font-size: 36px;
  color: #178fff;
}
.rank-table {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 8%;
  min-width: 1200px;
}
.table {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.table-header {
  font-size: 24px;
  margin: 50px 0;
}
.pagin{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>