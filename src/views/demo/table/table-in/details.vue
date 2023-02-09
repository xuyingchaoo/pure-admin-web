<!--
 * @Author: xuyingchao
 * @Date: 2023-01-10 14:52:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 11:26:49
 * @Descripttion: 
-->
<script setup lang="ts">
import { getUserDetails } from "@/api/demo";
defineOptions({
  name: "TableInDetails"
});
const dataLoading = ref(false);
const formData = <any>ref({});
const props = defineProps({
  query: {
    require: false,
    type: Object as any
  },
  showType: {
    require: true,
    type: Number
  }
});
const emit = defineEmits(["update:showType"]);
function handleBack() {
  emit("update:showType", 1);
}
// 请求详情
function initDetails() {
  // const route = useRoute();
  const { id } = props.query;
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
  console.log("props.query", props.query);
  initDetails();
});
</script>
<template>
  <el-card class="rz-page" v-loading="dataLoading">
    <rz-layout
      :btnShow="true"
      :openModel="2"
      currentPath="/demo/table/tableTag/details"
      @handleBack="handleBack"
    >
      <template #content>
        <rz-title title="基本信息" />
        <div class="rz-details">
          <el-row>
            <el-col class="details-row" :lg="8" :md="24">
              <label>人员姓名</label>
              <div>{{ formData.username }}</div>
            </el-col>
            <el-col class="details-row" :lg="8" :md="24">
              <label>状态</label>
              <div>{{ formData.status == 1 ? "正常" : "禁用" }}</div>
            </el-col>
            <el-col class="details-row" :lg="8" :md="24">
              <label>联系方式</label>
              <div>{{ formData.mobile }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="details-row" :lg="8" :md="24">
              <label>角色</label>
              <div>
                {{ formData.roleNameList ? formData.roleNameList[0] : "-" }}
              </div>
            </el-col>
          </el-row>
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
