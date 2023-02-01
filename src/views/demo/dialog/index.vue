<script setup lang="ts">
import { FormInstance } from "element-plus";
const formVisible = ref(false);
const formData = <any>ref({});
const rules = {
  name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
};
const ruleFormRef = ref<FormInstance>();
function openDialog() {
  formVisible.value = true;
}
function closeDialog() {
  formVisible.value = false;
}
</script>
<template>
  <el-card>
    <el-button type="primary" @click="openDialog()"> 打开弹窗 </el-button>
    <el-dialog
      v-model="formVisible"
      title="新建产品"
      :width="680"
      draggable
      :before-close="closeDialog"
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
        <el-form-item label="备注" prop="mark">
          <el-input
            v-model="textareaValue"
            type="textarea"
            :style="{ width: '480px' }"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
