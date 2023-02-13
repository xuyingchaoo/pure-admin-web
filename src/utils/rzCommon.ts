/*
 * @Author: xuyingchao
 * @Date: 2023-01-28 13:06:43
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-13 11:35:18
 * @Descripttion:
 */
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { baseUrlApi } from "@/api/utils";
import { getToken } from "@/utils/auth";
import { router } from "@/router";
import { usePermissionStoreHook } from "@/store/modules/permission";

export function useCommon() {
  const multiTags = computed(() => {
    return useMultiTagsStoreHook()?.multiTags;
  });
  // 打开新tag
  const handleRouter = (name, query) => {
    // 路由跳转
    router.push({ name, query });
  };
  // 关闭tag
  function handleCloseTag(currentPath: string) {
    useMultiTagsStoreHook().handleTags("splice", currentPath);
    router.push({
      path: multiTags.value[(multiTags as any).value.length - 1].path
    });
  }
  // 导出文件
  function downLoadExcel(url: string, params: object) {
    const urls = baseUrlApi(url);
    params["token"] = getToken().accessToken;
    let paramsData = "?";
    for (const key in params) {
      if (params[key] != null) {
        paramsData += key + "=" + params[key] + "&";
      }
    }
    window.location.href = urls + paramsData.slice(0, paramsData.length - 1);
  }
  /**
   * 时间格式化方法
   * params fmt(String)-格式 date(Date)-时间
   * YYYY-mm-dd HH:MM:SS
   */
  function timeFormat(fmt, date = new Date()) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
    };
    for (const k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }

  /**
   * 是否有权限
   * @param {*} key
   */
  function isAuth(key) {
    const per = usePermissionStoreHook()?.permissions;
    return per.indexOf(key) !== -1 || false;
  }

  return { handleRouter, handleCloseTag, downLoadExcel, timeFormat, isAuth };
}
