/*
 * @Author: zhangmin
 * @Date: 2021-05-19 08:38:33
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-10 09:40:08
 * @Description: 接口地址配置
 */

let baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //默认的url，可以没有

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //本地的请求url
    break;
  case "production":
    baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //生产环境url
    break;
}

export const URL = baseUrl;
