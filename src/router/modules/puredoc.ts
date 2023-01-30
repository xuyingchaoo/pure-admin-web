/*
 * @Author: xuyingchao
 * @Date: 2023-01-30 09:46:07
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-30 09:58:04
 * @Descripttion:
 */
const IFrame = () => import("@/layout/frameView.vue");

export default {
  path: "/doc",
  redirect: "/doc",
  meta: {
    icon: "Search",
    title: "相关文档"
  },
  children: [
    {
      path: "/pure-admin-doc/index",
      name: "框架官方文档",
      component: IFrame,
      meta: {
        title: "框架官方文档",
        frameSrc: "https://yiming_chang.gitee.io/pure-admin-doc/"
      }
    },
    {
      path: "/pure-admin-utils/index",
      name: "框架工具文档",
      component: IFrame,
      meta: {
        title: "框架工具文档",
        frameSrc: "https://pure-admin-utils.netlify.app/"
      }
    },
    {
      path: "/iframe/ep",
      name: "element-plus",
      component: IFrame,
      meta: {
        title: "element-plus",
        frameSrc: "https://element-plus.org/zh-CN/",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/iframe/tailwindcss",
      name: "Tailwindcss",
      component: IFrame,
      meta: {
        title: "Tailwindcss",
        frameSrc: "https://tailwindcss.com/docs/installation"
      }
    },
    {
      path: "/iframe/vite",
      name: "vite",
      component: IFrame,
      meta: {
        title: "vite",
        frameSrc: "https://cn.vitejs.dev/"
      }
    },
    {
      path: "/iframe/pinia",
      name: "Pinia",
      component: IFrame,
      meta: {
        title: "Pinia",
        frameSrc: "https://pinia.vuejs.org/zh/index.html"
      }
    }
  ]
} as RouteConfigsTable;
