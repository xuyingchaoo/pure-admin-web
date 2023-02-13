<!--
 * @Author: xuyingchao
 * @Date: 2023-01-28 10:15:59
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-13 10:26:06
 * @Descripttion: 三级一次性返回地区select
-->
<script lang="ts" setup>
import { getAreaTree } from "@/api/common";
const props = defineProps({
  placeholder: {
    require: false,
    type: String
  },
  areaIds: {
    require: false,
    type: Array
  }
});
const value = ref();

const optionProps = {
  expandTrigger: "hover" as const,
  value: "id",
  label: "name",
  children: "childList"
};
const options = ref([]);
const emit = defineEmits(["update:areaIds"]);
const handleChange = value => {
  emit("update:areaIds", value);
};
const init = list => {
  value.value = list;
};
// 对外暴露的属性
defineExpose({
  init
});
onBeforeMount(() => {
  getAreaTree().then(res => {
    if (res.code == 0) {
      options.value = res.data;
    }
  });
});
</script>
<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="optionProps"
    :placeholder="props.placeholder"
    @change="handleChange"
    clearable
  />
</template>
