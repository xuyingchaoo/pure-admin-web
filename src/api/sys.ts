/*
 * @Author: xuyingchao
 * @Date: 2023-02-09 13:29:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 14:19:32
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

/** 角色详情 */
export const getRoleDetails = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/role/info"), {
    params
  });
};
/** 角色新增 */
export const doAddRole = (data?: object) => {
  return http.request<any>("post", baseUrlApi("sys/role/create"), { data });
};
/** 角色修改 */
export const doEditRole = (data?: object) => {
  return http.request<any>("put", baseUrlApi("sys/role/update"), { data });
};

/** 用户详情 */
export const getUserDetails = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/user/info"), {
    params
  });
};
/** 用户新增 */
export const doAddUser = (data?: object) => {
  return http.request<any>("post", baseUrlApi("sys/user/create"), { data });
};
/** 用户修改 */
export const doEditUser = (data?: object) => {
  return http.request<any>("put", baseUrlApi("sys/user/update"), { data });
};
