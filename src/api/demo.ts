/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 10:26:48
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-17 13:26:18
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
