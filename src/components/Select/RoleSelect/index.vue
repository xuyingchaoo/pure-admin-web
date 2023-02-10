<!--
 * @Author: xuyingchao
 * @Date: 2023-01-17 13:22:16
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 14:40:31
 * @Descripttion: 
-->
<script setup lang="ts">
import { getRoleSelect } from "@/api/demo";
const options = ref([]);
const value = ref();
const props = defineProps({
  placeholder: {
    require: false,
    type: String,
    default: "请选择角色"
  },
  roleValue: {
    require: false,
    type: Array
  },
  multiple: {
    require: false,
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["update:roleValue"]);
function handleChange(e) {
  emit("update:roleValue", e);
}
// 对外暴露的属性
defineExpose({
  value
});
// 编辑时候赋值
// onUpdated(() => {
//   value.value = props.roleValue;
// });
onBeforeMount(() => {
  getRoleSelect().then(res => {
    if (res.code == 0) {
      options.value = res.data;
    }
  });
});
</script>
<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    @change="handleChange"
    :multiple="multiple"
    clearable
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :value="item.id"
      :label="item.name"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>
