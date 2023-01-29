/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 10:26:48
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-29 15:47:11
 * @Descripttion:
 */
import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
/** 获取人员列表 */
export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/user/page"), { params });
};

/** 获取人员角色列表 */
export const getRoleSelect = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/role/select"), { params });
};

/** 人员新增 */
export const doAddUser = (data?: object) => {
  return http.request<any>("post", baseUrlApi("sys/user/create"), { data });
};
/** 人员编辑 */
export const doEditUser = (data?: object) => {
  return http.request<any>("put", baseUrlApi("sys/user/update"), { data });
};
/** 人员详情 */
export const getUserDetails = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/user/info"), { params });
};
