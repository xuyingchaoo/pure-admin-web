<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-30 13:24:04
 * @Descripttion: 
-->
<script setup lang="ts">
// import { useForm } from "./index";
import { doAddUser, doEditUser } from "@/api/demo";
import { message } from "@/utils/message";
import { formData, rules, initDetails, dataLoading, handleForm } from "./index";
import { useCommon } from "@/utils/rzCommon";
const { handleCloseTag } = useCommon();
const formRef = ref();
// 提交表单
async function handleSubmit(formRef) {
  console.log("formData", formData);
  if (!formRef) return;
  await formRef.validate(valid => {
    if (valid) {
      const form = handleForm(formData);
      dataLoading.value = true;
      const handleFuntion = form.id ? doEditUser : doAddUser;
      handleFuntion(form).then(res => {
        if (res.code == 0) {
          message("操作成功！", {
            type: "success"
          });
          // 关闭标签
          handleCloseTag("/demo/form");
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
onMounted(() => {
  initDetails();
});
</script>
<template>
  <el-card v-loading="dataLoading">
    <rz-layout :btnShow="true" currentPath="/demo/form">
      <template #content>
        <rz-title title="基本信息" />
        <el-form
          class="rz-form rz-form-3"
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="人员名称" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入人员名称"
            />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="formData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入联系方式" />
          </el-form-item>
          <el-form-item label="角色" prop="roleIdList">
            <role-select
              placeholder="请选择角色"
              v-model:roleValue="formData.roleIdList"
            />
          </el-form-item>
          <el-form-item label="头像" prop="avatarUrl">
            <rz-upload
              v-model:fileListDefault="formData.avatarUrl"
              :limit="1"
              accept="image/*"
              tip="注：只支持JPG、JPEG、PNG等图片格式"
            />
          </el-form-item>
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
