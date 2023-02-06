<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-02 09:09:27
 * @Descripttion: 
-->
<script setup lang="ts">
import { useForm } from "./edit";
import { doAddUser, doEditUser } from "@/api/demo";
import { message } from "@/utils/message";
import { getUserDetails } from "@/api/demo";
const { formData, rules, dataLoading, handleForm } = useForm();
const formRef = ref();
const uploadImgRef = ref();
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
      formData.avatarUrl = uploadImgRef.value.fileList;
      const form = handleForm(formData);
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
        const { avatarUrl, username, sex, mobile, roleIdList, id } = res.data;
        formData.id = id;
        formData.avatarUrl = avatarUrl ? [{ url: avatarUrl }] : [];
        formData.username = username;
        formData.sex = sex;
        formData.mobile = mobile;
        formData.roleIdList = roleIdList;
        uploadImgRef.value.fileList = formData.avatarUrl;
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
            <rz-upload-img
              ref="uploadImgRef"
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
