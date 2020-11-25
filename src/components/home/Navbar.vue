<!--
 * @Author: Yokee
 * @Date: 2020-11-17 11:26:26
 * @LastEditTime: 2020-11-24 09:58:08
 * @FilePath: \admin\src\components\home\Navbar.vue
-->
<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="user.avatar" class="avatar" /> -->
          <span class="span-admin">超级管理员</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
           <router-link to="/password">
            <el-dropdown-item> 修改密码 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display: block" @click="loginout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";

export default {
  
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user.user,
    }),
  },

  methods: {
    ...mapActions(['updateUser']),
    loginout: function () {
      localStorage.removeItem("user");
      this.updateUser({})
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.navbar {
  height: 70px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .right-menu {
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    .avatar-container {
      .avatar-wrapper {
        margin-right: 30px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
        .span-admin{
          font-size: 16px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
