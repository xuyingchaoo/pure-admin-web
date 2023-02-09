/*
 * @Author: xuyingchao
 * @Date: 2023-01-13 10:34:59
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 10:52:34
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

// 获取省市区级联
export const getAreaTree = (data?: any) => {
  return http.request<any>("get", baseUrlApi("sys/regions/tree"), {
    params: data?.params
  });
};
