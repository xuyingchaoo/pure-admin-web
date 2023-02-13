<!--
 * @Author: xuyingchao
 * @Date: 2023-02-09 11:59:00
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-13 10:37:03
 * @Descripttion: 
-->
<script setup lang="ts">
import { useRenderIcon } from "@/components/Re/ReIcon/src/hooks";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { getSysMenu, doDeleteMenu } from "@/api/sys";
import FormDialog from "./components/form-dialog.vue";
import { message } from "@/utils/message";

defineOptions({
  name: "system-sys-menu"
});
const dataList = ref([]);
const formDialog = ref(); // editor实例
/** 表格列 */
const columns: TableColumnList = [
  {
    label: "菜单名称",
    prop: "meta.title"
  },
  {
    label: "菜单图标",
    prop: "meta.icon"
  },
  {
    label: "路由名称",
    prop: "name"
  },
  {
    label: "路由地址",
    prop: "path"
  },
  {
    label: "组件地址",
    prop: "component"
  },
  {
    label: "是否需要显示",
    prop: "meta.showLink"
  },
  {
    label: "是否需要缓存",
    prop: "meta.keepAlive"
  },
  {
    label: "是否直接显示父级",
    prop: "meta.showParent"
  },
  {
    label: "排序",
    prop: "meta.rank"
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 260
  }
];
// 编辑
function handleEdit(row, type) {
  // 0 新增 1修改本级菜单 2新增下级
  formDialog.value.openFormDialog(row, type);
}
//删除
function handleDelete(row) {
  doDeleteMenu([row.id]).then(() => {
    message("删除成功", { type: "success" });
    getData();
  });
}
function getData() {
  getSysMenu().then(res => {
    dataList.value = res.data;
    formDialog.value.options = res.data;
    console.log(res);
  });
}
onMounted(() => {
  getData();
});
</script>
<template>
  <el-card>
    <rz-layout>
      <template #content>
        <PureTableBar title="菜单管理" @refresh="getData">
          <template #buttons>
            <el-button
              type="primary"
              :icon="useRenderIcon(AddFill)"
              @click="handleEdit(null, 0)"
            >
              新增
            </el-button>
          </template>
          <template v-slot="{ size }">
            <pure-table
              border
              stripe
              table-layout="auto"
              row-key="id"
              showOverflowTooltip
              :data="dataList"
              :columns="columns"
              header-row-class-name="rz-table-heard"
            >
              <template #operation="{ row }">
                <el-button
                  link
                  type="primary"
                  :icon="useRenderIcon(EditPen)"
                  @click="handleEdit(row, 1)"
                  >修改
                </el-button>
                <el-button
                  link
                  type="primary"
                  :icon="useRenderIcon(EditPen)"
                  @click="handleEdit(row, 2)"
                  >新增下级
                </el-button>
                <el-popconfirm
                  title="是否确认删除?"
                  @confirm="handleDelete(row)"
                >
                  <template #reference>
                    <el-button
                      class="reset-margin"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Delete)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </pure-table>
          </template>
        </PureTableBar>
        <FormDialog ref="formDialog" @update="getData" />
      </template>
    </rz-layout>
  </el-card>
</template>
