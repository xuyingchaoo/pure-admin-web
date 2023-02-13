<!--
 * @Author: xuyingchao
 * @Date: 2023-01-28 10:15:59
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-13 10:30:11
 * @Descripttion: 四级远程搜索地区组件
-->
<script lang="ts" setup>
import { getAreaLazyTree } from "@/api/common";
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
  // expandTrigger: "hover" as const,
  value: "id",
  label: "name",
  children: "childList",
  lazy: true,
  lazyLoad(node, resolve) {
    const { data, level } = node;
    if (level < 4) {
      getAreaLazyTree({ pid: data ? data.id : "" }).then(res => {
        if (res.code == 0) {
          if (level == 3) {
            res.data.map(item => {
              item.leaf = true;
            });
          }
          resolve(res.data);
        }
      });
    } else {
      resolve([]);
    }
  }
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
  getAreaLazyTree().then(res => {
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
