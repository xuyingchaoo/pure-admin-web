/*
 * @Author: xuyingchao
 * @Date: 2023-01-09 15:06:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 09:32:24
 * @Descripttion:
 */
import { defineStore } from "pinia";
import { store } from "@/store";
import { cacheType } from "./types";
import { constantMenus } from "@/router";
import { ascending, filterTree, filterNoPermissionTree } from "@/router/utils";

export const usePermissionStore = defineStore({
  id: "pure-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 缓存页面keepAlive
    cachePageList: [],
    permissions: []
  }),
  actions: {
    /** 存储用户权限 */
    SET_PERMISSIONS(data: Array<string>) {
      this.permissions = data;
    },
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes)))
      );
    },
    cacheOperate({ mode, name }: cacheType) {
      switch (mode) {
        case "add":
          this.cachePageList.push(name);
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case "delete":
          // eslint-disable-next-line no-case-declarations
          const delIndex = this.cachePageList.findIndex(v => v === name);
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
