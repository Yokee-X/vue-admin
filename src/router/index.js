/*
 * @Author: Yokee
 * @Date: 2020-11-16 10:43:48
 * @LastEditTime: 2020-11-24 09:57:54
 * @FilePath: \admin\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login";
import statistics from "../views/statistics";
import dnsmanage from "../views/dnsmanage";
import shortlink from "../views/shortlink";
import rank from "../views/rank";
import store from "../store";
import password from "../views/password";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: Home,
    redirect:'/rank',
    children: [
      {
        path: "/rank",
        component: rank,
      },
      {
        path: "/statistics",
        component: statistics
      },
      {
        path: "/dnsmanage",
        component: dnsmanage
      },
      {
        path: "/shortlink",
        component: shortlink
      },
      {
        path:'/password',
        component:password,
      }
    ]
  },
  {
    path: '*',
    redirect: '/login'
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

const whitelist = ["/login"];

router.beforeEach((to, from, next) => {
  let user = store.state.user.user;
  if (whitelist.indexOf(to.path) > -1) {
    next();
    return
  }
  if (user.token) {
      next();

    } else {
      next("/login");
    }
});

export default router;
