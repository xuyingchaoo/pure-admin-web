/*
 * @Author: xuyingchao
 * @Date: 2023-01-13 10:34:59
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 17:31:27
 * @Descripttion:
 */
import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

// 获取表格列表
export const getTableList = (data?: any) => {
  return http.request<any>("get", baseUrlApi(data.url), {
    params: data.params
  });
};

// 删除表格数据
export const doTableDelete = (data?: any) => {
  return http.request<any>("delete", baseUrlApi(data.url), {
    data: data.params
  });
};
