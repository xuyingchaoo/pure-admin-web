<!--
 * @Author: xuyingchao
 * @Date: 2023-02-01 17:24:47
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-06 16:46:57
 * @Descripttion: 
-->
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { message } from "@/utils/message";
defineOptions({
  name: "FormDialog"
});
const formVisible = ref(false);
const formData = reactive({
  name: "",
  status: "",
  type: "",
  description: "",
  textareaValue: ""
});
const rules = {
  name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
};
const ruleFormRef = ref<FormInstance>();

const SELECT_OPTIONS = [
  { label: "网关", value: 1 },
  { label: "人工智能", value: 2 },
  { label: "CVM", value: 3 },
  { label: "防火墙", value: 4 },
  { label: "未知", value: 5 }
];
function openFormDialog() {
  formVisible.value = true;
}
function closeDialog(formEl: FormInstance | undefined) {
  if (!formEl) return;
  resetForm(formEl);
  formVisible.value = false;
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      console.log(formData);
      message("提交成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<template>
  <el-card>
    <el-button type="primary" @click="openFormDialog()">
      打开弹窗表单
    </el-button>
    <!-- 表单弹窗 -->
    <el-dialog
      v-model="formVisible"
      title="新建产品"
      :width="680"
      @close="closeDialog(ruleFormRef)"
    >
      <!-- 表单内容 -->
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="formData.name"
            :style="{ width: '480px' }"
            placeholder="请输入产品名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="产品状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="0">已停用</el-radio>
            <el-radio label="1">已启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品描述" prop="description">
          <el-input
            v-model="formData.description"
            :style="{ width: '480px' }"
            placeholder="请输入产品描述"
            clearable
          />
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-select
            v-model="formData.type"
            clearable
            :style="{ width: '480px' }"
          >
            <el-option
              v-for="(item, index) in SELECT_OPTIONS"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="textareaValue">
          <el-input
            v-model="formData.textareaValue"
            type="textarea"
            :style="{ width: '480px' }"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
