/*
 * @Author: Yokee
 * @Date: 2020-11-16 10:43:48
 * @LastEditTime: 2020-11-17 11:20:02
 * @FilePath: \admin\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user:{
      state: {
        user: JSON.parse(localStorage.getItem("user") || "{}")
      },
      mutations: {
        UPDATE_USER(state, data) {
          state.user = data;
        }
      },
      actions: {
        updateUser(store, data) {
          store.commit("UPDATE_USER", data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      }
    }
  }
});
