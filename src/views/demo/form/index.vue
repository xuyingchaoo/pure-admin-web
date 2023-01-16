<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 15:37:25
 * @Descripttion: 
-->
<script setup lang="ts">
import { formDatam, rules } from "./index";

const formRef = ref();
</script>
<template>
  <div>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
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
  </div>
</template>
