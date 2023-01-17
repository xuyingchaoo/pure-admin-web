<!--
 * @Author: xuyingchao
 * @Date: 2023-01-17 13:22:16
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-17 17:18:57
 * @Descripttion: 
-->
<script setup lang="ts">
import { getRoleSelect } from "@/api/demo";
const options = ref([]);
const value = ref([]);
const props = defineProps({
  placeholder: {
    require: false,
    type: String
  }
});
const emit = defineEmits(["update:roleValue"]);
function handleChange(e) {
  console.log(e);
  emit("update:roleValue", e);
}

onBeforeMount(() => {
  getRoleSelect().then(res => {
    if (res.code == 0) {
      options.value = res.data;
      console.log(options);
    }
  });
});
</script>
<template>
  <div>
    <el-select
      v-model="value"
      :placeholder="props.placeholder"
      @change="handleChange"
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
  </div>
</template>
