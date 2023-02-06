<!--
 * @Author: xuyingchao
 * @Date: 2023-01-10 14:52:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-30 14:25:55
 * @Descripttion: 
-->
<script setup lang="ts">
import { getUserDetails } from "@/api/demo";
const dataLoading = ref(false);
const formData = <any>ref({});
// 请求详情
function initDetails() {
  const route = useRoute();
  const id = route.query?.id ? route.query?.id : "";
  if (id) {
    getUserDetails({ id }).then(res => {
      if (res.code == 0) {
        formData.value = res.data;
        console.log(formData);
      }
    });
  }
}

onMounted(() => {
  initDetails();
});
</script>
<template>
  <el-card v-loading="dataLoading">
    <rz-layout :btnShow="true" currentPath="/demo/table/tableTag/details">
      <template #content>
        <rz-title title="基本信息" />
        <div class="rz-details">
          <div class="details-row">
            <label>人员姓名</label>
            <div>{{ formData.username }}</div>
          </div>
          <div class="details-row">
            <label>性别</label>
            <div>{{ formData.sex == 1 ? "男" : "女" }}</div>
          </div>
          <div class="details-row">
            <label>联系方式</label>
            <div>{{ formData.mobile }}</div>
          </div>
          <div class="details-row">
            <label>角色</label>
            <div>
              {{ formData.roleNameList ? formData.roleNameList[0] : "-" }}
            </div>
          </div>
          <div class="details-row">
            <label>头像</label>
            <div>
              <el-avatar fit="cover" :size="80" :src="formData.avatarUrl" />
            </div>
          </div>
        </div>
      </template>
    </rz-layout>
  </el-card>
</template>
<style>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: red;
}
</style>
