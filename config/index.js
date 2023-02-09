/*
 * @Author: zhangmin
 * @Date: 2021-05-19 08:38:33
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-08 16:24:33
 * @Description: 接口地址配置
 */

let baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //默认的url，可以没有

switch (process.env.NODE_ENV) {
  case "development":
    // baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //本地测试环境url
    baseUrl = "https://security.ruiztech.cn:4443/ruiz/admin/"; //本地测试环境url
    break;
  case "staging":
    baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //预发环境url
    break;
  case "production":
    baseUrl = "https://code-sand.ruiztech.cn:4443/ruiz/admin/"; //生产环境url
    break;
}

export const URL = baseUrl;
