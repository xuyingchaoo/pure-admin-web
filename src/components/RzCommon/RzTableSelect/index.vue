<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 13:53:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-07 13:09:32
 * @Descripttion: 表格select选择框
-->
<script setup lang="ts">
const props = defineProps({
  // 字段名称
  // name: {
  //   require: false,
  //   type: String
  // },
  // 默认值
  defaultValue: {
    require: false,
    type: [Number, String]
  },
  // 下拉选择项
  options: {
    require: true,
    type: Array
  },
  // 默认占位
  placeholder: {
    require: false,
    type: String,
    default: "请选择"
  },
  // 是否可编辑 默认可编辑
  disabled: {
    require: false,
    type: Boolean,
    default: false
  }
  // 表格第几行index
  // index: {
  //   require: false,
  //   type: [String, Number]
  // }
});
const selectValue = ref(props.defaultValue);
const optionsList = ref(props.options);
const emit = defineEmits(["update:value", "update:valueInfo", "update"]);

function handleChange() {
  const info = optionsList.value.find(item => item.id == selectValue.value);
  emit("update:value", selectValue.value);
  emit("update:valueInfo", info);
  emit("update", { value: info });
}
</script>
<template>
  <el-select
    style="width: 100%"
    v-model="selectValue"
    :placeholder="placeholder"
    @change="handleChange"
    :disabled="disabled"
  >
    <el-option
      v-for="item in optionsList"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>
<style lang="scss" scoped></style>
