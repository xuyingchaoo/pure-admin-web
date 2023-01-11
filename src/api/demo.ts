/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 10:26:48
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-10 10:31:34
 * @Descripttion:
 */
import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
/** 获取人员列表 */
export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/user/page"), { params });
};
