/*
 * @Author: xuyingchao
 * @Date: 2023-01-09 15:06:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 10:32:22
 * @Descripttion:
 */
import type { App } from "vue";
import { createPinia } from "pinia";
// 引入数据持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPluginPersistedstate);
export function setupStore(app: App<Element>) {
  app.use(store);
}
export { store };
