/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 09:58:55
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-31 09:18:46
 * @Descripttion: 自定义demo静态路由
 */
export default {
  path: "/demo",
  redirect: "/demo",
  meta: {
    icon: "informationLine",
    title: "demo",
    rank: 9
  },
  children: [
    {
      path: "/demo/form",
      name: "DemoForm",
      component: () => import("@/views/demo/form/index.vue"),
      meta: {
        title: "DemoForm"
      }
    },
    {
      path: "/demo/tableTag",
      name: "DemoTable-新标签模式",
      component: () => import("@/views/demo/table-tag/index.vue"),
      meta: {
        title: "DemoTable-新标签模式"
      }
    },
    {
      path: "/demo/tableIn",
      name: "DemoTable-内部模式",
      component: () => import("@/views/demo/table-in/index.vue"),
      meta: {
        title: "DemoTable-内部模式"
      }
    },
    {
      path: "/demo/icon",
      name: "DemoIcon",
      component: () => import("@/views/demo/icon/index.vue"),
      meta: {
        title: "DemoIcon"
      }
    },
    {
      path: "/demo/tableTag/details",
      name: "人员详情",
      component: () => import("@/views/demo/table-tag/details.vue"),
      meta: {
        showLink: false
      }
    },
    {
      path: "/demo/tableTag/edit",
      name: "人员编辑",
      component: () => import("@/views/demo/table-tag/edit.vue"),
      meta: {
        title: "人员编辑",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
