import { RouteRecordRaw } from "vue-router";
import ACCESS_AUTH from "@/access/accessAuth";
import HomeView from "../views/HomeView.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/hide",
    name: "hide",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/AdminView.vue"),
    meta: {
      access: ACCESS_AUTH.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "noAuth",
    component: () =>
      import(/* webpackChunkName: "noAuth" */ "../views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
