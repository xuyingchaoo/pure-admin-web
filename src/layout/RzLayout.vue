<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 09:31:44
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-19 14:42:24
 * @Descripttion: 
-->
<script setup lang="ts">
const props = defineProps({
  type: {
    require: false,
    type: String
  }
});
</script>

<template>
  <div :class="[type == 'list' ? 'rz-layout-list' : '', 'rz-layout']">
    <slot name="content" />
  </div>
</template>
<style scoped>
.rz-layout {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
.rz-layout-list {
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>
