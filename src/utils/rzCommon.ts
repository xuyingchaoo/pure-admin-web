/*
 * @Author: xuyingchao
 * @Date: 2023-01-28 13:06:43
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-30 13:30:25
 * @Descripttion:
 */
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { baseUrlApi } from "@/api/utils";
import { getToken } from "@/utils/auth";
import { useRouter } from "vue-router";
interface routerInfo {
  /** path */
  path: string;
  /** tab名称 */
  name: string;
  /** 用户名 */
  query?: {};
}
export function useCommon() {
  const router = useRouter();
  const multiTags = computed(() => {
    return useMultiTagsStoreHook()?.multiTags;
  });
  // 打开新tag
  const handleRouter = (info: routerInfo) => {
    const { path, name, query } = info;
    useMultiTagsStoreHook().handleTags("push", {
      path,
      name,
      query,
      meta: {
        title: name,
        // 最大打开标签数
        dynamicLevel: 1
      }
    });
    // 路由跳转
    router.push({ name, query });
  };
  // 关闭tag
  function handleCloseTag(currentPath) {
    useMultiTagsStoreHook().handleTags("splice", currentPath);
    router.push({
      path: multiTags.value[(multiTags as any).value.length - 1].path
    });
  }
  // 导出文件
  function downLoadExcel(url, params) {
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

  return { handleRouter, handleCloseTag, downLoadExcel };
}
