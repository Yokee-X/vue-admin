<!--
 * @Author: Yokee
 * @Date: 2020-11-17 11:26:26
 * @LastEditTime: 2020-11-23 10:52:20
 * @FilePath: \admin\src\components\home\Sidebar.vue
-->
<template>
    <el-menu  class="el-menu-vertical-demo" :collapse="collapse" router>
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
   data(){
    return {
      collapse:false,
      screenWidth:document.body.clientWidth
    }
  },
  methods: {
    
  },
  watch:{
    screenWidth(val){
      this.screenWidth=val
    }
},
  mounted(){
    const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                this.screenWidth = window.screenWidth
                if(this.screenWidth<1200){
                  this.collapse=true
                }else{
                  this.collapse=false
                }
          })()
        }
  },
  beforeDestroy(){
    window.removeEventListener('resize')
  }
 
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.el-menu-vertical-demo{
  height: 100%;

}

</style>