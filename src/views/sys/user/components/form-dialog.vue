<!--
 * @Author: xuyingchao
 * @Date: 2023-02-01 17:24:47
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 14:46:22
 * @Descripttion: 管理员新增弹窗
-->
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { doAddUser, doEditUser, getUserDetails } from "@/api/sys";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
const options = ref([]);
const formVisible = ref(false);
const formData = reactive({
  value: {
    id: "", // id
    mobile: "", // 手机号
    username: "", // 姓名
    status: 1, // 状态 0.禁用 1.正常
    roleIdList: [] // 角色id列表
  }
});
const rules = {
  username: [{ required: true, message: "请输入管理员姓名", trigger: "blur" }],
  mobile: [{ required: true, message: "请输入管理员手机号", trigger: "blur" }]
};
const userFormRef = ref<FormInstance>();
const roleSelectRef = ref();
const emit = defineEmits(["update"]);

// 打开弹窗
function openFormDialog(row) {
  if (row && row.id) {
    getUserDetails({ id: row.id }).then(res => {
      console.log(res);
      const { id, mobile, username, status, roleIdList } = res.data;
      formData.value = { id, mobile, username, status, roleIdList };
      roleSelectRef.value.value = roleIdList;
    });
  }
  formVisible.value = true;
}
// 关闭弹窗
function closeDialog(formEl: FormInstance | undefined) {
  if (!formEl) return;
  resetForm(formEl); // 重置表单
  formVisible.value = false;
}
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      const form = cloneDeep(formData.value);
      const doFunction = form.id ? doEditUser : doAddUser;
      doFunction(form).then(res => {
        if (res.code == 0) {
          message("操作成功", { type: "success" });
          formVisible.value = false;
          resetForm(formEl);
          emit("update");
        }
      });
    }
  });
};
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 对外暴露的属性
defineExpose({
  openFormDialog,
  options
});
</script>
<template>
  <el-dialog
    v-model="formVisible"
    title="新建管理员"
    :width="680"
    :destroy-on-close="true"
    @close="closeDialog(userFormRef)"
  >
    <!-- 表单内容 -->
    <el-form
      ref="userFormRef"
      :model="formData.value"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="管理员姓名" prop="username">
        <el-input
          v-model="formData.value.username"
          :style="{ width: '480px' }"
          placeholder="请输入管理员姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="管理员手机号" prop="mobile">
        <el-input
          v-model="formData.value.mobile"
          :style="{ width: '480px' }"
          placeholder="请输入管理员手机号"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.value.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色" prop="roleIdList">
        <role-select
          ref="roleSelectRef"
          :style="{ width: '480px' }"
          :multiple="true"
          v-model:roleValue="formData.value.roleIdList"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog(userFormRef)">取消</el-button>
      <el-button type="primary" @click="submitForm(userFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
