<!--
 * @Author: Yokee
 * @Date: 2020-11-24 09:57:32
 * @LastEditTime: 2020-11-24 10:33:24
 * @FilePath: \admin\src\views\password\index.vue
-->
<template>
  <div class="container">
    <div class="item">
      <span class="item_title">原密码</span>
      <el-input
        class="item_input"
        v-model="oldpassword"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="item">
      <span class="item_title">新密码</span>
      <el-input
        class="item_input"
        v-model="newpassword"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="item">
      <span class="item_title">确认密码</span>
      <el-input
        class="item_input"
        v-model="repassword"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <el-button class="btn" @click="change">确认修改</el-button>
  </div>
</template>

<script>
import { changePassword } from "../../api";
import {mapActions } from "vuex";

export default {
  data() {
    return {
      oldpassword: "",
      newpassword: "",
      repassword: "",
    };
  },
  methods: {
      ...mapActions(['updateUser']),
    async change() {
      let res = await changePassword({
        oldPassword: this.oldpassword,
        password: this.newpassword,
        rePassword: this.repassword,
      });
      if (res) {
        this.$message({
          message: "修改密码成功",
          type: "success",
        });
        setTimeout(() => {
          localStorage.removeItem("user");
          this.updateUser({});
          this.$router.push({ path: "/" });
        }, 200);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10%;
}
.item {
  display: flex;
  width: 70%;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
}
.item_title {
  display: inline-block;
  font-size: 18px;
  margin-right: 10px;
}
.item_input {
  width: 85%;
}
.btn {
}
</style>