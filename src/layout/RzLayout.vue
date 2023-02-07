<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 09:31:44
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-07 11:54:15
 * @Descripttion: 
-->
<script setup lang="ts">
import { useCommon } from "@/utils/rzCommon";
const { handleCloseTag } = useCommon();
const props = defineProps({
  // 页面类型，列表页需要传入'list',其他详情页、编辑新增页可不传
  // type: {
  //   require: false,
  //   type: String,
  //   default: ""
  // },
  // 页面切换模式 1-标签页 2-内部
  openModel: {
    require: false,
    type: Number,
    default: 1
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
const emit = defineEmits(["handleBack"]);

// 取消
function handleBack() {
  if (props.openModel == 1) {
    // 关闭标签
    handleCloseTag(props.currentPath);
  } else {
    emit("handleBack");
  }
}
</script>

<template>
  <!-- :class="[type == 'list' ? 'rz-layout-list' : '', 'rz-layout']" -->
  <div class="rz-layout">
    <div
      class="layout-content"
      :style="{ paddingBottom: btnShow ? '99px' : '' }"
    >
      <el-scrollbar>
        <slot name="content" />
      </el-scrollbar>
    </div>
    <div class="layout-btn" v-if="btnShow">
      <!-- 默认有取消按钮 -->
      <el-button @click="handleBack">取消</el-button>
      <slot name="btn" />
    </div>
  </div>
</template>
<style lang="scss">
.rz-layout {
  // width: calc(100% - 40px);
  width: 100%;
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
.layout-content {
  min-height: 100%;
  .el-scrollbar__view {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
