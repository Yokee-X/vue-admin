<!--
 * @Author: Yokee
 * @Date: 2020-11-16 17:47:32
 * @LastEditTime: 2020-11-25 11:08:42
 * @FilePath: \admin\src\views\shortlink\index.vue
-->
<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <el-input v-model="search" placeholder="搜索短链接" class="input" />
        <el-button type="primary" class="button" @click="searchTemp()"
          >搜索</el-button
        >
      </div>
      <el-button type="primary" @click="addVisible = true">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="shortlist.results" border style="width: 100%">
        <el-table-column label="序号" min-width="20" align="center">
          <template v-slot="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" min-width="20">
          <template v-slot="scope">
            <span>{{ changeTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原链接" prop="url" min-width="20">
        </el-table-column>
        <el-table-column label="短链接" prop="urlLite" min-width="20">
        </el-table-column>
        <el-table-column
          label="响应时间(s)"
          prop="sleep"
          min-width="20"
          align="center"
        >
        </el-table-column>
        <el-table-column label="备注" prop="remark" min-width="20">
        </el-table-column>
        <el-table-column label="平台" prop="os" min-width="20" align="center">
        </el-table-column>
        <el-table-column label="状态" min-width="20" align="center">
          <template v-slot="scope">
            <span
              :class="scope.row.status == 1 ? 'status-open' : 'status-close'"
              >{{ scope.row.status == 1 ? "正常" : "关闭" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20" align="center">
          <template v-slot="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="open(scope.row.id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :page-size="shortlist.page.limit"
        layout=" prev, pager, next"
        :total="shortlist.page.total"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
      >
      </el-pagination>
    </div>
    <!-- 添加 -->
    <el-dialog title="添加域名" :visible.sync="addVisible" width="50%" center>
      <el-form label-width="100px" :model="addForm">
        <el-form-item label="选择域名">
          <el-select v-model="addForm.id" placeholder="请选择域名">
            <template v-for="(item, index) in domainDate">
              <el-option
                :label="item.domain"
                :value="item.id"
                :key="index"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="选择平台">
          <el-checkbox-group v-model="addForm.os">
          <el-checkbox label="android">Android</el-checkbox>
          <el-checkbox label="pc">PC</el-checkbox>
          <el-checkbox label="ios">IOS</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item label="跳转时间">
          <el-input v-model="addForm.sleep"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="createHandler()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑短链接"
      :visible.sync="updataVisible"
      width="50%"
      center
    >
      <el-form label-width="100px" :model="updateForm">
        <el-form-item label="跳转等待时间">
          <el-input v-model="updateForm.sleep"></el-input>
        </el-form-item>
        <el-form-item label="链接状态">
          <el-switch
            v-model="updateForm.status"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
        <el-form-item label="选择平台">
          <el-checkbox-group v-model="updateForm.os">
          <el-checkbox label="android">Android</el-checkbox>
          <el-checkbox label="pc">PC</el-checkbox>
          <el-checkbox label="ios">IOS</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input type="textarea" v-model="updateForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updataVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHandler()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查询 -->
    <el-dialog title="来源分析" :visible.sync="checkVisible" width="90%" center>
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
          <el-button type="primary" class="button" @click="checkHandler(urlId,timevalue[0].getTime(),timevalue[1].getTime())"
            >查询</el-button>
        </el-form-item>
      </el-form>
       <el-table :data="checkData" border style="width: 100%">
        <el-table-column label="域名" prop="domain" min-width="20" align="center">
        </el-table-column>
                <el-table-column label="次数" prop="num" min-width="20" align="center">
        </el-table-column>
                <el-table-column label="百分比" min-width="20" align="center">
                  <template  v-slot="scope">
                      <span>{{scope.row.pa.toFixed(2)+'%'}}</span>
                  </template>
        </el-table-column>
       </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  updataLink,
  createLink,
  listLink,
  listDomain,
  refPa
} from "../../api";
import changeTime from "../../utils/time.js";
import LineChart from "../../components/lineChart";

export default {
  data() {
    return {
      updataVisible: false,
      addVisible: false,
      currentPage: 1,
      domainDate: [],
      shortlist: { page: {}, results: [] },
      urlId:1,
      addForm: {
        id: "",
        url: "",
        sleep: "",
        remark: "",
        os: [],
      },
      updateForm: {
        id: 0,
        sleep: "",
        status: false,
        remark: "",
        os: "",
      },
      search: "",
      timevalue: [],
      checkVisible: false,
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
      checkData:[]
    };
  },
  components: {
    LineChart,
  },
  beforeMount() {
    this.listHandler();
    this.optionHandler();
  },
  methods: {
    changeTime,
    edit(data) {
      this.updataVisible = true;
      this.updateForm = {
        id: data.id,
        sleep: data.sleep,
        status: data.status == 1 ? true : false,
        remark: data.remark,
        os:data.os.split(",")
      };

    },
    open(urlId) {
      this.checkVisible = true;
      this.urlId = urlId;
      this.checkHandler(this.urlId);
    },
    async checkHandler(urlId,start=0,end=0) {
      let res = await refPa({
        urlId,
      start,
      end
      });
      if(res){
        this.checkData=[...res]
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
      let res = await listLink({
        where: { urlLite: `? ${this.search}` },
        order: "id:desc",
      });
      if (res) {
        this.shortlist = { ...res };
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listHandler(this.currentPage);
    },
    async optionHandler() {
      let res = await listDomain({
        limit: 9999,
      });
      if (res) {
        for (let i in res.results) {
          if (res.results[i].status == 1) {
            this.domainDate.push(res.results[i]);
          }
        }
      }
    },
    async listHandler() {
      let res = await listLink({
        page: this.currentPage,
        order: "id:desc",
      });
      if (res) {
        this.shortlist = { ...res };
      }
    },
    async updateHandler() {
      let res = await updataLink({
        id: this.updateForm.id,
        sleep: this.updateForm.sleep,
        status: this.updateForm.status ? 1 : -1,
        remark: this.updateForm.remark,
        os: this.updateForm.os.join(),
      });
      if (res) {
        this.listHandler(this.currentPage);
        this.updataVisible = false;
        this.updateForm = {
          id: 0,
          sleep: "",
          status: false,
          remark: "",
          os: "",
        };
      }
    },
    async createHandler() {
      let res = await createLink({
        domainId: this.addForm.id,
        url: this.addForm.url,
        sleep: this.addForm.sleep,
        remark: this.addForm.remark,
        os: this.addForm.os.join(),
      });
      if (res) {
        this.listHandler(this.currentPage);
        this.addVisible = false;
        this.addForm = { id: "", url: "", sleep: "", remark: "", os: [] };
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
.status-open {
  color: #67c23a;
}
.status-close {
  color: #909399;
}
.button {
  margin: 0 20px;
}
</style>