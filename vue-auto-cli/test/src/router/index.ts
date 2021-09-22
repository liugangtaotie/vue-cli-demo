import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/message",
    name: "Message",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "message" */ "@VIE/Message.vue"),
  },
  {
    path: "/service",
    name: "Service",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "service" */ "@VIE/Service.vue"),
  },
  {
    path: "/person",
    name: "Person",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "person" */ "@VIE/Person.vue"),
  },
  /**
   * 404 Page
   */
  {
    path: "*",
    meta: {
      title: "页面找不到了～！～",
    },
    component: () => import("@VIE/404.vue"),
  },
];

// 将来每次用户请求都需要一个router 实例
export default function createRouter() {
  return new VueRouter({
    base: process.env.BASE_URL,
    mode: "history",
    routes,
  });
}
