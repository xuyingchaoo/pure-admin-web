/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 09:58:55
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-08 15:41:23
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
        title: "DemoForm",
        keepAlive: true
      }
    },
    {
      path: "/demo/dialog",
      name: "DemoDialog",
      redirect: "/demo/dialog",
      meta: {
        title: "DemoDialog"
      },
      children: [
        {
          path: "/demo/form-dialog",
          name: "FormDialog",
          component: () => import("@/views/demo/dialog/form-dialog/index.vue"),
          meta: {
            title: "表单弹窗"
          }
        },
        {
          path: "/demo/table-dialog",
          name: "TableDialog",
          component: () => import("@/views/demo/dialog/table-dialog/index.vue"),
          meta: {
            title: "表格搜索弹窗"
          }
        }
      ]
    },
    {
      path: "/demo/table",
      name: "DemoTable",
      redirect: "/demo/table",
      meta: {
        title: "DemoTable"
      },
      children: [
        {
          path: "/demo/table/tableTag",
          name: "新标签模式",
          component: () => import("@/views/demo/table/table-tag/index.vue"),
          meta: {
            title: "新标签模式"
          }
        },
        {
          path: "/demo/table/tableIn",
          name: "内部模式",
          component: () => import("@/views/demo/table/table-in/index.vue"),
          meta: {
            title: "内部模式"
          }
        },
        {
          path: "/demo/table/tableEdit",
          name: "可编辑",
          component: () => import("@/views/demo/table/table-edit/index.vue"),
          meta: {
            title: "可编辑"
          }
        }
      ]
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
      path: "/demo/table/tableTag/details",
      name: "TableTagDetails",
      component: () => import("@/views/demo/table/table-tag/details.vue"),
      meta: {
        title: "人员详情",
        showLink: false
      }
    },
    {
      path: "/demo/table/tableTag/edit",
      name: "TableTagEdit",
      component: () => import("@/views/demo/table/table-tag/edit.vue"),
      meta: {
        title: "人员编辑",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
