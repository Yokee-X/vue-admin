<!--
 * @Author: Yokee
 * @Date: 2020-11-16 17:19:16
 * @LastEditTime: 2020-11-18 10:00:31
 * @FilePath: \admin\src\views\Home.vue
-->
<template>
  <div class="app-wrapper">
    <div class="sidebar">
    <sidebar class="sidebar-container" />
    </div>
    <div class="main-container">
      <div class="navbar-container">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import {
  AppMain,
  Navbar,
  Sidebar,
} from "../components/home";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  methods: {
    handleClickOutside() {},
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.sidebar{
   position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px!important;
  font-size: 0px;
  overflow: hidden;
  z-index: 999;
  
}
.main-container{
  position: relative;
  min-height: 100%;
  margin-left: 210px;
}
</style>
