/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 10:26:48
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 16:47:48
 * @Descripttion:
 */
import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
/** 获取人员列表 */
export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/user/page"), { params });
};

// /** 删除人员 */
// export const doDelete = (params?: object) => {
//   return http.request<any>("get", baseUrlApi("sys/user/page"), { params });
// };
