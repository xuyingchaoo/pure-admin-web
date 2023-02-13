<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 13:53:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-31 17:06:59
 * @Descripttion: 编辑器组件
-->
<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IEditorConfig } from "@wangeditor/editor";
import { baseUrlApi } from "@/api/utils";
import { getToken } from "@/utils/auth";
type InsertFnTypeImg = (url: string, alt: string, href: string) => void;
type InsertFnTypeVideo = (url: string, poster: string) => void;
// 编辑器高度，默认400
const props = defineProps({
  height: {
    require: false,
    type: Number,
    default: 400
  }
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("");
// bar Config
const toolbarConfig: any = { excludeKeys: "fullScreen" };
// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
  MENU_CONF: {}
};
const mode = "default";
const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
// 上传地址配置
const accessToken = getToken().accessToken;
const uploadUrl = baseUrlApi(`oss/upload?token=${accessToken}`); // 上传地址

// 上传图片配置，详细见文档
editorConfig.MENU_CONF["uploadImage"] = {
  // 上传地址
  server: uploadUrl,
  // form-data fieldName
  fieldName: "file",
  // 单个文件的最大体积限制，默认为 2M 这里做修改5M
  maxFileSize: 5 * 1024 * 1024, // 5M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 100,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ["image/*"],
  // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
  meta: {},
  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,
  // 自定义增加 http  header
  headers: {},
  // 跨域是否传递 cookie ，默认为 false
  withCredentials: true,
  // 超时时间，默认为 10 秒
  timeout: 10 * 1000, // 10 秒
  // 自定义插入图片
  customInsert(res: any, insertFn: InsertFnTypeImg) {
    // res 即服务端的返回结果
    const { data } = res;
    // 从 res 中找到 url alt href ，然后插入图片
    insertFn(data, data, data);
  }
};
// 上传视频配置，详细见文档
editorConfig.MENU_CONF["uploadVideo"] = {
  // "https://victory.sl-feather.com/ruiz/admin/oss/upload?token=7782b8f6f6a2fb3a4c2007e0d0bdd644",
  // 上传地址
  server: uploadUrl,
  // form-data fieldName ，默认值 'wangeditor-uploaded-video'
  fieldName: "file",
  // 单个文件的最大体积限制，默认为 10M
  maxFileSize: 10 * 1024 * 1024, // 10M
  // 最多可上传几个文件，默认为 5
  maxNumberOfFiles: 100,
  // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ["video/*"],
  // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
  meta: {},
  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,
  // 自定义增加 http  header
  headers: {},
  // 跨域是否传递 cookie ，默认为 false
  withCredentials: true,
  // 超时时间，默认为 30 秒
  timeout: 15 * 1000, // 15 秒
  // 自定义插入视频
  customInsert(res: any, insertFn: InsertFnTypeVideo) {
    const { data } = res;
    // res 即服务端的返回结果
    // 从 res 中找到 url poster ，然后插入视频
    insertFn(data, "");
  }
  // 视频不支持 base64 格式插入
};
function init(str) {
  editorRef.value.setHtml(str);
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
// 对外暴露的属性
defineExpose({
  valueHtml,
  init
});
</script>
<template>
  <div class="rz-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height: props.height + 'px', 'overflow-y': 'hidden' }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<style lang="scss">
.rz-editor {
  border: 1px solid #ccc;

  .w-e-text-placeholder {
    top: 10px;
  }
}
</style>
