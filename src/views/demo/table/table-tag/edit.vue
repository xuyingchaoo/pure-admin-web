<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 16:42:41
 * @Descripttion: 
-->
<script setup lang="ts">
import { useForm } from "./edit";
import { doAddUser, doEditUser } from "@/api/demo";
import { message } from "@/utils/message";
import { useCommon } from "@/utils/rzCommon";
import { getUserDetails } from "@/api/demo";
import { cloneDeep } from "@pureadmin/utils";

defineOptions({
  name: "TableTagEdit"
});
const { formData, rules, dataLoading } = useForm();
const { handleCloseTag } = useCommon();
const formRef = ref();
const roleSelectRef = ref();
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
          // 关闭标签
          handleCloseTag("/demo/table/tableTag/edit");
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
  const route = useRoute();
  const id = route.query?.id ? route.query?.id : "";
  console.log(id, formData);
  if (id) {
    getUserDetails({ id }).then(res => {
      console.log("initDetails ing");
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
  <el-card v-loading="dataLoading">
    <rz-layout :btnShow="true" currentPath="/demo/table/tableTag/edit">
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
