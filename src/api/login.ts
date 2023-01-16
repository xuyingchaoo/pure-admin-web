/*
 * @Author: xuyingchao
 * @Date: 2023-01-05 15:08:22
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-13 10:35:08
 * @Descripttion:
 */
import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 登录 */
export const doLogin = (data?: object) => {
  return http.request<any>("post", baseUrlApi("auth/login"), { data });
};

/** 获取菜单 */
export const getMenu = (params?: object) => {
  return http.request<any>("get", baseUrlApi("sys/menu/nav"), { params });
};

/** 获取用户信息 */
export const getUserInfo = () => {
  return http.request<any>("get", baseUrlApi(`sys/user/info`), {});
};
