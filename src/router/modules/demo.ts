/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 09:58:55
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-10 15:10:52
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
      path: "/demo/table",
      name: "DemoTable",
      component: () => import("@/views/demo/table/index.vue"),
      meta: {
        title: "DemoTable"
      }
    },
    {
      path: "/demo/table/edit",
      name: "人员新增",
      component: () => import("@/views/demo/table/edit.vue"),
      meta: {
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
