/*
 * @Author: Yokee
 * @Date: 2020-11-16 10:43:48
 * @LastEditTime: 2020-11-17 10:26:36
 * @FilePath: \admin\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
