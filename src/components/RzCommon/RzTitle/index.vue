<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 13:53:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-31 16:27:41
 * @Descripttion: 页面内小标题组件
-->
<script setup lang="ts">
const props = defineProps({
  title: {
    require: true,
    type: String
  }
});
</script>
<template>
  <div class="rz-title">
    <span>{{ props.title }}</span>
  </div>
</template>
<style lang="scss" scoped>
.rz-title {
  font-weight: bold;
  line-height: 20px;
  border-left: 5px solid var(--el-color-primary); // 主题色
  padding-left: 20px;
  margin-bottom: 20px;
}
</style>
