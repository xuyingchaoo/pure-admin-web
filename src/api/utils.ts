/*
 * @Author: xuyingchao
 * @Date: 2023-01-05 15:07:59
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-05 16:35:07
 * @Descripttion:
 */
import { URL } from "../../config/index";
console.log(URL);
export const baseUrlApi = (url: string) => `${URL}${url}`;
