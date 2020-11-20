<!--
 * @Author: Yokee
 * @Date: 2020-11-16 10:43:48
 * @LastEditTime: 2020-11-18 11:31:17
 * @FilePath: \admin\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import {mapActions,mapMutations} from 'vuex'
export default {
  methods:{
    ...mapActions(['updateUser']),
    ...mapMutations(['UPDATE_USER'])
  },
  mounted(){
    // this.updateUser({type:'mmmmm1'})
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100vh;
}
[v-cloak] {
  display: none;
}
</style>