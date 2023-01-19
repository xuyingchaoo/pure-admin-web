<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-19 13:09:59
 * @Descripttion: 
-->
<script setup lang="ts">
import { useForm } from "./index";
const { formData, rules } = useForm();

const formRef = ref();
async function handleSubmit(formRef) {
  console.log(formData);
  if (!formRef) return;
  await formRef.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
}
</script>
<template>
  <!-- <RzLayout type="form">
    <template #content> -->
  <!-- <template #header>
        <span class="font-medium">基础信息</span>
      </template> -->
  <el-form
    class="rz-form-3"
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item label="人员名称" prop="username">
      <el-input v-model="formData.username" placeholder="请输入人员名称" />
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
    <el-form-item label="角色" prop="belong">
      <role-select
        placeholder="请选择角色"
        v-model:roleValue="formData.belong"
      />
    </el-form-item>
    <el-form-item class="!w-full">
      <el-button>取消</el-button>
      <el-button type="primary" @click="handleSubmit(formRef)">提交</el-button>
    </el-form-item>
  </el-form>
  <!-- </template>
  </RzLayout> -->
</template>
