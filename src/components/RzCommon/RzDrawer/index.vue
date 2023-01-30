<!--
 * @Author: xuyingchao
 * @Date: 2023-01-28 10:15:59
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-29 11:27:24
 * @Descripttion: 
-->
<script setup lang="ts">
const props = defineProps({
  title: {
    require: true,
    type: String
  },
  show: {
    require: true,
    type: Boolean
  }
});

const emit = defineEmits(["update:show", "clear", "search", "reset"]);
// 使用计算属性 解决直接用props.show导致Unexpected mutation of "props" prop.eslint报错问题
const dialogShow = computed({
  get: () => props.show,
  set: val => emit("update:show", val)
});
function cancelClick() {
  emit("update:show", false);
}
function confirmClick() {
  emit("update:show", false);
  emit("search");
}
function handleReset() {
  cancelClick();
  emit("reset");
}
</script>
<template>
  <el-drawer v-model="dialogShow" :before-close="cancelClick">
    <template #header>
      <h4>{{ props.title || "筛选" }}</h4>
    </template>
    <template #default>
      <slot name="searchForm" />
    </template>
    <template #footer>
      <div style="flex: auto; text-align: center">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="confirmClick">查询</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped></style>
