<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-31 16:24:22
 * @Descripttion: 
-->
<script setup lang="ts">
import { useForm } from "./index";
const formRef = ref();
const rzEditorRef = ref(); // editor实例
const uploadImgRef = ref(); // 图片上传实例
const uploadVideoRef = ref(); // 视频上传实例
const uploadFileRef = ref(); // 文件上传实例
const { formData, rules, initDetails, dataLoading, handleForm } = useForm();

// 提交表单
async function handleSubmit(formRef) {
  if (!formRef) return;
  await formRef.validate(valid => {
    if (valid) {
      // 取值
      formData.content = rzEditorRef.value.valueHtml;
      formData.videoUrl = uploadVideoRef.value.fileList;
      formData.avatarUrl = uploadImgRef.value.fileList;
      formData.fileUrl = uploadFileRef.value.fileList;
      // 处理提交数据格式
      const form = handleForm(formData);
      dataLoading.value = true;
      console.log("form", form);
      setTimeout(() => {
        dataLoading.value = false;
      }, 1000);
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
          <el-form-item label="图片" prop="avatarUrl">
            <rz-upload-img
              ref="uploadImgRef"
              :limit="1"
              tip="注：只支持JPG、JPEG、PNG等图片格式"
            />
          </el-form-item>
          <el-form-item label="视频" prop="videoUrl">
            <rz-upload-file
              ref="uploadVideoRef"
              :limit="1"
              :limitSize="20"
              accept="video/*"
              tip="注：只支持MP4、MOV、AVI等视频格式"
            />
          </el-form-item>
          <el-form-item label="文件" prop="fileUrl">
            <rz-upload-file
              ref="uploadFileRef"
              :limit="1"
              :limitSize="20"
              tip="注：只支持pdf,.xlsx,.xls,.doc,.docx文件格式"
            />
          </el-form-item>
          <el-form-item class="!w-full" label="人员介绍" prop="content">
            <rz-editor ref="rzEditorRef" />
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
