/*
 * @Author: xuyingchao
 * @Date: 2023-01-09 15:06:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 16:11:13
 * @Descripttion:
 */
import { cdn } from "./cdn";
import vue from "@vitejs/plugin-vue";
import { viteBuildInfo } from "./info";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import { configCompressPlugin } from "./compress";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
import themePreprocessorPlugin from "@pureadmin/theme";
import DefineOptions from "unplugin-vue-define-options/vite";
import { genScssMultipleScopeVars } from "../src/layout/theme";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export function getPluginsList(
  command: string,
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
) {
  const prodMock = true;
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    DefineOptions(),
    // 线上环境删除console
    removeConsole({ external: ["src/assets/iconfont/iconfont.js"] }),
    viteBuildInfo(),
    // 自定义主题
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        extract: true
      }
    }),
    // svg组件化支持
    svgLoader(),
    // ElementPlus({}),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    }),
    // 自动按需引入插件
    AutoImport({
      imports: ["vue", "vue-router"], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
      dts: "types/auto-imports.d.ts", // 生成auto-imports.d.ts的声明文件
      eslintrc: {
        // 默认false, true启用。生成一次就可以，
        // 避免每次工程启动都生成，
        // 一旦生成配置文件之后，最好把enable关掉，即改成false。
        // 否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        enabled: false
      }
    }),
    // Vue按需组件自动导入。
    Components({
      dirs: ["src/components"], // 默认就是识别src/components文件，该文件夹下的所有组件都会自动 import
      dts: "types/components.d.ts" // 生成components.d.ts的声明文件
      // resolvers: [ElementPlusResolver({ importStyle: "sass" })]
    }),
    // 打包分析
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : null
  ];
}
