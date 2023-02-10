<!--
 * @Author: xuyingchao
 * @Date: 2023-02-09 11:59:00
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 16:28:39
 * @Descripttion: 
-->
<script setup lang="ts">
import { useColumns } from "./index";
defineOptions({
  name: "system-sys-log"
});
const {
  dataList,
  columns,
  pagination,
  loading,
  onCurrentChange,
  onSizeChange,
  onSearch
} = useColumns();
</script>
<template>
  <el-card>
    <rz-layout>
      <template #content>
        <PureTableBar title="日志管理" @refresh="onSearch">
          <template #buttons />
          <template v-slot="{ size }">
            <pure-table
              border
              stripe
              table-layout="auto"
              row-key="id"
              showOverflowTooltip
              :data="dataList"
              :columns="columns"
              header-row-class-name="rz-table-heard"
              :loading="loading"
              :size="size"
              :pagination="pagination"
              @current-change="onCurrentChange"
              @size-change="onSizeChange"
            />
          </template>
        </PureTableBar>
      </template>
    </rz-layout>
  </el-card>
</template>
