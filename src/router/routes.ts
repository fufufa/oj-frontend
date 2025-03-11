import { RouteRecordRaw } from "vue-router";
import ACCESS_AUTH from "@/access/accessAuth";
import ExampleView from "@/views/ExampleView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "浏览题目",
    component: ExampleView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_AUTH.ADMIN,
    },
  },
  {
    path: "/hide",
    name: "隐藏",
    component: ExampleView,
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
    name: "无权限",
    component: () =>
      import(/* webpackChunkName: "noAuth" */ "../views/NoAuthView.vue"),
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
