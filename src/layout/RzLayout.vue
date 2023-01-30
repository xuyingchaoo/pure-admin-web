<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 09:31:44
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-30 13:30:19
 * @Descripttion: 
-->
<script setup lang="ts">
import { useCommon } from "@/utils/rzCommon";
const { handleCloseTag } = useCommon();
const props = defineProps({
  // 页面类型，列表页需要传入'list',其他详情页、编辑新增页可不传
  type: {
    require: false,
    type: String,
    default: ""
  },
  // 是否需要显示底部操作按钮
  btnShow: {
    require: false,
    type: Boolean,
    default: false
  },
  // 取消需要关闭的tag页
  currentPath: {
    require: false,
    type: String,
    default: ""
  }
});
// 取消
function handleBack() {
  // 关闭标签
  handleCloseTag(props.currentPath);
}
</script>

<template>
  <div :class="[type == 'list' ? 'rz-layout-list' : '', 'rz-layout']">
    <el-scrollbar>
      <div
        class="layout-content"
        :style="{ paddingBottom: btnShow ? '99px' : '' }"
      >
        <slot name="content" />
      </div>
      <div class="layout-btn" v-if="btnShow">
        <!-- 默认有取消按钮 -->
        <el-button @click="handleBack">取消</el-button>
        <slot name="btn" />
      </div>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
.rz-layout-list.rz-layout {
  width: 100%;
}
.rz-layout {
  width: calc(100% - 40px);
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  .layout-btn {
    position: absolute;
    bottom: 20px;
    background: white;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    // box-shadow: 0 0 13px rgba(0, 0, 0, 0.1);
  }
}
</style>
