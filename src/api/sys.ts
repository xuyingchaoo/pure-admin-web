/*
 * @Author: xuyingchao
 * @Date: 2023-02-09 13:29:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 16:59:53
 * @Descripttion:
 */
import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
/** 获取系统菜单列表 */
export const getSysMenu = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/menu/tree"), {
    params
  });
};
/** 菜单新增 */
export const doAddMenu = (data?: object) => {
  return http.request<any>("post", baseUrlApi("sys/menu/create"), { data });
};

/** 菜单修改 */
export const doEditMenu = (data?: object) => {
  return http.request<any>("put", baseUrlApi("sys/menu/update"), { data });
};
/** 菜单删除 */
export const doDeleteMenu = (data?: any) => {
  return http.request<any>("delete", baseUrlApi("sys/menu/delete"), { data });
};
