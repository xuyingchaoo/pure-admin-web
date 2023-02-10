<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 16:52:21
 * @Descripttion: 
-->
<script setup lang="ts">
import { useForm } from "./types/edit";
import { doAddUser, doEditUser } from "@/api/demo";
import { message } from "@/utils/message";
import { getUserDetails } from "@/api/demo";
import { cloneDeep } from "@pureadmin/utils";

defineOptions({
  name: "TableInEdit"
});
const { formData, rules, dataLoading } = useForm();
const formRef = ref();
const roleSelectRef = ref();

const props = defineProps({
  showType: {
    require: true,
    type: Number
  },
  query: {
    require: false,
    type: Object as any
  }
});
const emit = defineEmits(["update:showType"]);
function handleBack() {
  emit("update:showType", 1);
}
// 提交表单
async function handleSubmit(formRef) {
  if (!formRef) return;
  await formRef.validate(valid => {
    if (valid) {
      const form = cloneDeep(formData);
      dataLoading.value = true;
      const handleFuntion = form.id ? doEditUser : doAddUser;
      handleFuntion(form).then(res => {
        if (res.code == 0) {
          message("操作成功！", {
            type: "success"
          });
          // 退回
          handleBack();
        } else {
          message(res.msg, {
            type: "error"
          });
        }
        dataLoading.value = false;
      });
    }
  });
}
function initDetails() {
  const { id } = props.query;
  if (id) {
    getUserDetails({ id }).then(res => {
      if (res.code == 0) {
        const { username, status, mobile, roleIdList, id } = res.data;
        formData.id = id;
        formData.username = username;
        formData.status = status;
        formData.mobile = mobile;
        formData.roleIdList = roleIdList;
        roleSelectRef.value.value = roleIdList;
      }
    });
  }
}
onMounted(() => {
  initDetails();
});
</script>
<template>
  <el-card class="rz-page" v-loading="dataLoading">
    <rz-layout
      :btnShow="true"
      :openModel="2"
      currentPath="/demo/table/tableTag/edit"
      @handleBack="handleBack"
    >
      <template #content>
        <rz-title title="基本信息" />
        <el-form
          class="rz-form"
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="100px"
        >
          <el-row>
            <el-col :lg="8" :md="24">
              <el-form-item label="人员名称" prop="username">
                <el-input
                  v-model="formData.username"
                  placeholder="请输入人员名称"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24">
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="formData.status">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24">
              <el-form-item label="联系方式" prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  placeholder="请输入联系方式"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="8" :md="24">
              <el-form-item label="角色" prop="roleIdList">
                <role-select
                  ref="roleSelectRef"
                  placeholder="请选择角色"
                  v-model:roleValue="formData.roleIdList"
                  :multiple="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #btn>
        <el-button type="primary" @click="handleSubmit(formRef)">
          提交
        </el-button>
      </template>
    </rz-layout>
  </el-card>
</template>
