<!--
 * @Author: Yokee
 * @Date: 2020-11-17 11:26:26
 * @LastEditTime: 2020-11-19 17:14:24
 * @FilePath: \admin\src\components\home\Sidebar.vue
-->
<template>
    <el-menu  class="el-menu-vertical-demo" :collapse="false" router>
      <el-menu-item index="1" route="/rank">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" route="/statistics">
        <i class="el-icon-menu"></i>
        <span slot="title">分类统计</span>
      </el-menu-item>
      <el-menu-item index="3" route="/dnsmanage">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">域名管理</span>
      </el-menu-item>
      <el-menu-item index="4" route="/shortlink">
        <i class="el-icon-share"></i>
        <span slot="title">短链接</span>
      </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {},
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.el-menu-vertical-demo{
  height: 100%;

}

</style>