<!--
 * @Author: xuyingchao
 * @Date: 2023-02-01 17:24:47
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 17:35:39
 * @Descripttion: 
-->
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { doAddMenu, doEditMenu } from "@/api/sys";
import { message } from "@/utils/message";

defineOptions({
  name: "MenuFormDialog"
});
const parantDisable = ref(false);
const options = ref([]);
const menuParentId = ref();
const formVisible = ref(false);
const formData = reactive({
  id: "", // 菜单id
  parentId: 0, // 父级菜单id 一级菜单默认0
  title: "", // 菜单名称
  icon: "", // 菜单图标
  name: "", // 路由名称 必须唯一并且和当前路由component字段对应的页面里用defineOptions包起来的name保持一致
  path: "", // 路由地址
  component: "", // 路由组件地址
  showLink: "", // 是否需要显示
  keepAlive: "", // 是否需要开启缓存
  showParent: "", // 是否显示父级菜单
  rank: "" // 排序 值越高排的越后（只针对顶级路由）
});
const rules = {
  title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  name: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
  path: [{ required: true, message: "请输入路由地址", trigger: "blur" }]
};
const ruleFormRef = ref<FormInstance>();
const optionProps = {
  expandTrigger: "hover" as const,
  value: "id",
  label: "name",
  checkStrictly: true
};
const emit = defineEmits(["update"]);

function openFormDialog(row, type) {
  // 打开初始化
  menuParentId.value = [];
  parantDisable.value = false;

  if (row) {
    const { parentId, name, path, component, meta, id } = row;
    const { title, icon, showLink, showParent, keepAlive, rank } = meta;
    // 1 修改本级菜单
    if (type == 1) {
      formData.id = id;
      formData.parentId = parentId;
      formData.title = title;
      formData.icon = icon;
      formData.name = name;
      formData.path = path;
      formData.component = component;
      formData.showLink = showLink;
      formData.keepAlive = keepAlive;
      formData.showParent = showParent;
      formData.rank = rank;
    } else {
      // 2 新增下级 新增下级时需要默认赋值父级菜单
      menuParentId.value = [id];
      formData.parentId = id;
      parantDisable.value = true;
    }
  }
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
      const form = handleForm();
      const doFunction = form.id ? doEditMenu : doAddMenu;
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
const handleForm = () => {
  const {
    id,
    parentId,
    title,
    icon,
    name,
    path,
    component,
    showLink,
    keepAlive,
    showParent,
    rank
  } = formData;
  let metaData = {};
  if (parentId) {
    metaData = { icon, title, showLink, keepAlive, showParent, rank };
  } else {
    metaData = { title, icon, showLink, rank };
  }
  const form = {
    id,
    parentId,
    type: 1,
    path,
    component,
    name,
    meta: metaData,
    children: []
  };
  return form;
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleChange = value => {
  console.log(value);
  formData.parentId = value ? value[value.length - 1] : 0;
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
    title="新建菜单"
    :width="680"
    @close="closeDialog(ruleFormRef)"
  >
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="父级菜单">
        <el-cascader
          v-model="menuParentId"
          :options="options"
          :props="optionProps"
          :show-all-levels="false"
          @change="handleChange"
          :disabled="parantDisable"
          clearable
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input
          v-model="formData.title"
          :style="{ width: '480px' }"
          placeholder="请输入菜单名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input
          v-model="formData.icon"
          :style="{ width: '480px' }"
          placeholder="请输入菜单图标"
          clearable
        />
      </el-form-item>
      <el-form-item label="路由名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="请输入菜单模块名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="路由地址" prop="path">
        <el-input
          v-model="formData.path"
          :style="{ width: '480px' }"
          placeholder="请输入菜单路由"
          clearable
        />
      </el-form-item>
      <el-form-item v-if="formData.parentId" label="组件地址" prop="component">
        <el-input
          v-model="formData.component"
          :style="{ width: '480px' }"
          placeholder="请输入组件地址"
          clearable
        />
      </el-form-item>
      <el-form-item label="排序" prop="rank">
        <el-input
          v-model="formData.rank"
          :style="{ width: '480px' }"
          placeholder="请输入排序"
          clearable
        />
      </el-form-item>
      <el-form-item label="是否需要显示" prop="showLink">
        <el-radio-group v-model="formData.showLink">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="formData.parentId"
        label="是否需要缓存"
        prop="keepAlive"
      >
        <el-radio-group v-model="formData.keepAlive">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="formData.parentId"
        label="是否直接显示父级"
        prop="showParent"
      >
        <el-radio-group v-model="formData.showParent">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog(ruleFormRef)">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
