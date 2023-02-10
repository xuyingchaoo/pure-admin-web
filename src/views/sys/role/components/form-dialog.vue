<!--
 * @Author: xuyingchao
 * @Date: 2023-02-01 17:24:47
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 15:26:02
 * @Descripttion: 
-->
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { doAddRole, doEditRole, getRoleDetails } from "@/api/sys";
import { message } from "@/utils/message";

defineOptions({
  name: "MenuFormDialog"
});
const props = defineProps({
  menuList: {
    require: false,
    type: Array
  }
});
// 表单实例
const menuFormRef = ref<FormInstance>();
// 菜单树实例
const menuTreeRef = ref();
const propsTree = {
  label: "title",
  children: "children"
};
const formVisible = ref(false);
const formData = reactive({
  id: "", // 角色id
  name: "", // 角色名称
  remark: "", // 备注
  menuIdList: [] // 菜单权限id列表
});
const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
};

const emit = defineEmits(["update"]);
const parentKeyId = ref([]);
// 获取当前树形菜单的所有父节点
// 半选中的节点 后台也需要接收 但前端初始化set选中的时候组件需要过滤掉
function getParentKey(list) {
  list.forEach(item => {
    if (item.children && item.children.length > 0) {
      parentKeyId.value.push(item.id);
      getParentKey(item.children);
    }
  });
}
function openFormDialog(row) {
  getParentKey(props.menuList);
  if (row) {
    getRoleDetails({ roleId: row.id }).then(res => {
      const { id, name, menuIdList, remark } = res.data;
      formData.id = id;
      formData.name = name;
      formData.menuIdList = menuIdList;
      formData.remark = remark;
      nextTick(() => {
        const data = menuIdList.filter(item => {
          return parentKeyId.value.indexOf(item) == -1;
        });
        menuTreeRef.value!.setCheckedKeys(data, false);
      });
    });
  } else {
    formData.id = "";
  }
  formVisible.value = true;
}
function closeDialog(formEl: FormInstance | undefined) {
  if (!formEl) return;
  resetForm(formEl);
  formData.id = "";
  formVisible.value = false;
  menuTreeRef.value!.setCheckedKeys([], false);
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      const form = handleForm();
      const doFunction = form.id ? doEditRole : doAddRole;
      doFunction(form).then(res => {
        console.log(res);
        if (res.code == 0) {
          message("操作成功", { type: "success" });
          formVisible.value = false;
          resetForm(formEl);
          emit("update");
        }
      });
      console.log(form);
    }
  });
};
const handleForm = () => {
  const newMenuIdList = menuTreeRef.value!.getCheckedKeys(false);
  const halfIdList = menuTreeRef.value!.getHalfCheckedKeys();
  console.log("newMenuIdList", newMenuIdList, halfIdList);
  formData.menuIdList = [...newMenuIdList, ...halfIdList];
  return formData;
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 对外暴露的属性
defineExpose({
  openFormDialog
});
</script>
<template>
  <el-dialog
    v-model="formVisible"
    title="新建角色"
    :width="680"
    @close="closeDialog(menuFormRef)"
  >
    <!-- 表单内容 -->
    <el-form
      ref="menuFormRef"
      :model="formData"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="请输入角色名称"
          clearable
        />
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          :style="{ width: '480px' }"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-tree
          ref="menuTreeRef"
          :props="propsTree"
          :data="props.menuList"
          node-key="id"
          show-checkbox
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog(menuFormRef)">取消</el-button>
      <el-button type="primary" @click="submitForm(menuFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
