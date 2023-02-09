<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 15:06:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 10:50:15
 * @Descripttion: 
-->
<script setup lang="ts">
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useUserStoreHook } from "@/store/modules/user";
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
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      :xl="8"
      style="margin-bottom: 20px"
    >
      <el-card>
        <template #header> store info </template>
        {{ JSON.stringify(useUserStoreHook()?.userInfo) }}
        {{ JSON.stringify(usePermissionStoreHook()?.permissions) }}
      </el-card>
    </el-col>
  </el-row>
</template>
