<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-30 14:31:39
 * @Descripttion: 
-->
<script setup lang="ts">
import { useRenderIcon } from "@/components/Re/ReIcon/src/hooks";
// 图标
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import More from "@iconify-icons/ep/more-filled";
import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Filter from "@iconify-icons/ep/filter";
import Download from "@iconify-icons/ep/download";
import View from "@iconify-icons/ep/view";
import { useColumns } from "./index";
import { useCommon } from "@/utils/rzCommon";
const { handleRouter } = useCommon();
const {
  columns,
  searchForm,
  onCurrentChange,
  onSizeChange,
  resetForm,
  onSearch,
  handleExportOut,
  handleDelete,
  pagination,
  dataList,
  loading
} = useColumns();

// 表单实例
const searchFormRef = ref();
const drawerFormRef = ref();
// 抽屉显隐
const showDrawer = ref(false);

// 控制侧边搜索弹窗显隐
function handleDrawer() {
  showDrawer.value = true;
}
// 新增
function handleEdit(type, row) {
  let query = {};
  if (row) {
    query = { id: row.id };
  }
  if (type == 3) {
    handleRouter({
      path: "/demo/tableTag/details",
      name: "人员详情",
      query
    });
  } else {
    handleRouter({
      path: "/demo/tableTag/edit",
      name: "人员编辑",
      query
    });
  }
}
</script>
<template>
  <div>
    <rz-layout type="list">
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
                placeholder="请输入人员姓名"
                clearable
                class="!w-[160px]"
              />
            </el-form-item>
            <el-form-item prop="mobile">
              <el-input
                v-model="searchForm.mobile"
                placeholder="请输入手机号"
                clearable
                class="!w-[160px]"
              />
            </el-form-item>
            <el-form-item prop="sex">
              <el-select
                v-model="searchForm.sex"
                placeholder="请选择性别"
                clearable
                class="!w-[160px]"
              >
                <el-option label="男" value="1" />
                <el-option label="女" value="2" />
              </el-select>
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
              <el-button :icon="useRenderIcon(Filter)" @click="handleDrawer">
                筛选
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="flex-1 mt-6">
          <PureTableBar title="用户管理" @refresh="onSearch">
            <template #buttons>
              <el-button
                type="primary"
                :icon="useRenderIcon(AddFill)"
                @click="handleEdit(1, {})"
              >
                新增
              </el-button>
              <el-button
                type="primary"
                :icon="useRenderIcon(Download)"
                @click="handleExportOut()"
              >
                导出
              </el-button>
            </template>
            <template v-slot="{ size }">
              <pure-table
                border
                stripe
                table-layout="auto"
                row-key="id"
                showOverflowTooltip
                :loading="loading"
                :data="dataList"
                :size="size"
                :columns="columns"
                :pagination="pagination"
                @current-change="onCurrentChange"
                @size-change="onSizeChange"
              >
                <template #operation="{ row }">
                  <el-button
                    @click="handleEdit(3, row)"
                    link
                    type="primary"
                    :icon="useRenderIcon(View)"
                    >查看
                  </el-button>
                  <el-button
                    @click="handleEdit(2, row)"
                    link
                    type="primary"
                    :icon="useRenderIcon(EditPen)"
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
                  <el-dropdown>
                    <el-button
                      class="ml-3 mt-[2px]"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(More)"
                    />
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <el-button
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Password)"
                          >
                            重置密码
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Role)"
                          >
                            分配角色
                          </el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </pure-table>
            </template>
          </PureTableBar>
        </el-card>
        <rz-drawer
          v-model:show="showDrawer"
          @search="onSearch"
          @reset="resetForm(drawerFormRef)"
        >
          <template #searchForm>
            <el-form
              ref="drawerFormRef"
              :inline="true"
              :model="searchForm"
              class="rz-drawer-form"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="searchForm.username"
                  placeholder="请输入人员姓名"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="mobile">
                <el-input
                  v-model="searchForm.mobile"
                  placeholder="请输入手机号"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="sex">
                <el-select
                  v-model="searchForm.sex"
                  placeholder="请选择性别"
                  clearable
                >
                  <el-option label="男" value="1" />
                  <el-option label="女" value="2" />
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </rz-drawer>
      </template>
    </rz-layout>
  </div>
</template>
