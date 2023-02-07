<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 15:06:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-07 08:59:31
 * @Descripttion: 
-->
<script setup lang="ts">
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
defineOptions({
  name: "Welcome"
});
const loading = ref<boolean>(true);
setTimeout(() => {
  loading.value = !loading.value;
}, 800);
</script>

<template>
  <el-row :gutter="24" style="margin: 20px">
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      :xl="8"
      style="margin-bottom: 20px"
    >
      <el-card>
        <template #header> 折线图 </template>
        <el-skeleton animated :rows="7" :loading="loading">
          <template #default>
            <Line />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      :xl="8"
      style="margin-bottom: 20px"
    >
      <el-card>
        <template #header> 饼图 </template>
        <el-skeleton animated :rows="7" :loading="loading">
          <template #default>
            <Pie />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      :xl="8"
      style="margin-bottom: 20px"
    >
      <el-card>
        <template #header> 柱状图 </template>
        <el-skeleton animated :rows="7" :loading="loading">
          <template #default>
            <Bar />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
</template>
