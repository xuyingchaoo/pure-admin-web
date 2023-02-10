<!--
 * @Author: xuyingchao
 * @Date: 2023-02-09 11:59:00
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 13:34:27
 * @Descripttion: 
-->
<script setup lang="ts">
import { useRenderIcon } from "@/components/Re/ReIcon/src/hooks";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import AddFill from "@iconify-icons/ri/add-circle-line";
// 图标
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { useColumns } from "./list";
import FormDialog from "./components/form-dialog.vue";
const {
  dataList,
  searchForm,
  columns,
  pagination,
  loading,
  onCurrentChange,
  onSizeChange,
  resetForm,
  onSearch,
  handleDelete
} = useColumns();
defineOptions({
  name: "system-sys-menu"
});
const formDialog = ref(); // editor实例
// 表单实例
const searchFormRef = ref();

// 编辑
function handleEdit(row, type) {
  // 0 新增 1修改本级菜单 2新增下级
  formDialog.value.openFormDialog(row, type);
}
//删除
// function handleDelete(row) {
//   doDeleteMenu([row.id]).then(() => {
//     message("删除成功", { type: "success" });
//     // getData();
//   });
// }
// function getData() {
//   getSysMenu().then(res => {
//     dataList.value = res.data;
//     formDialog.value.options = res.data;
//     console.log(res);
//   });
// }
// onMounted(() => {
//   getData();
// });
</script>
<template>
  <rz-layout>
    <template #content>
      <el-card>
        <el-form
          ref="searchFormRef"
          :inline="true"
          :model="searchForm"
          class="rz-search-form pl-4 pt-4 w-[99/100]"
        >
          <el-form-item prop="username">
            <el-input
              v-model="searchForm.username"
              placeholder="请输入管理员姓名"
              clearable
              class="!w-[160px]"
            />
          </el-form-item>
          <el-form-item class="search-form-btn !w-[270px] min-w-max">
            <el-button
              type="primary"
              :icon="useRenderIcon(Search)"
              :loading="loading"
              @click="onSearch"
            >
              搜索
            </el-button>
            <el-button
              :icon="useRenderIcon(Refresh)"
              @click="resetForm(searchFormRef)"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="flex-1 mt-6">
        <PureTableBar title="管理员管理">
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
              :loading="loading"
              :size="size"
              :pagination="pagination"
              @current-change="onCurrentChange"
              @size-change="onSizeChange"
            >
              <template #operation="{ row }">
                <el-button
                  link
                  type="primary"
                  :icon="useRenderIcon(EditPen)"
                  @click="handleEdit(row, 1)"
                  >修改
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
      </el-card>
      <FormDialog ref="formDialog" />
    </template>
  </rz-layout>
</template>
