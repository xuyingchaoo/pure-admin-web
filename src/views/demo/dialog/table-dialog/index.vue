<!--
 * @Author: xuyingchao
 * @Date: 2023-02-01 17:24:47
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-06 09:55:37
 * @Descripttion: 
-->
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { useColumns } from "./index";
const {
  onCurrentChange,
  onSizeChange,
  onSearch,
  handleSelectionChange,
  selectAllHandle,
  toggleSelection,
  columns,
  searchForm,
  pagination,
  dataList,
  loading,
  tableRef,
  multipleSelection
} = useColumns();
const tableVisible = ref(false);
const searchFormRef = ref<FormInstance>();
const SEX_OPTIONS = [
  { label: "男", value: 1 },
  { label: "女", value: 2 }
];

function openTableDialog() {
  tableVisible.value = true;
  onSearch().then(() => {
    // 默认选中第一条
    multipleSelection.value = [dataList.value[0]];
    toggleSelection(multipleSelection.value);
  });
}
function closeDialog(formEl: FormInstance | undefined) {
  if (!formEl) return;
  resetForm(formEl);
  tableVisible.value = false;
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      tableVisible.value = false;
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
    <el-button type="primary" @click="openTableDialog()">
      打开弹窗表格搜索
    </el-button>
    <p v-for="(item, index) in multipleSelection" :key="index">
      {{ item.username }}
    </p>
    <!-- 表格搜索弹窗 -->
    <el-dialog
      v-model="tableVisible"
      title="人员选择"
      :width="1000"
      @close="closeDialog(searchFormRef)"
    >
      <!-- 表单内容 -->
      <el-form
        ref="searchFormRef"
        :inline="true"
        class="rz-search-form"
        :model="searchForm"
      >
        <el-form-item prop="username" class="!mr-3">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户姓名"
            clearable
          />
        </el-form-item>
        <el-form-item prop="sex" class="!mr-3">
          <el-select
            v-model="searchForm.sex"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="(item, index) in SEX_OPTIONS"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <pure-table
        border
        stripe
        ref="tableRef"
        table-layout="auto"
        row-key="id"
        showOverflowTooltip
        header-row-class-name="rz-table-heard"
        :loading="loading"
        :data="dataList"
        :columns="columns"
        :pagination="pagination"
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
        @select="handleSelectionChange"
        @select-all="selectAllHandle"
      />
      <template #footer>
        <el-button @click="closeDialog(searchFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(searchFormRef)">
          确定
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
