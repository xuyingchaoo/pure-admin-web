<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-19 13:16:26
 * @Descripttion: 
-->
<script setup lang="ts">
import { useRenderIcon } from "@/components/Re/ReIcon/src/hooks";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
// 图标
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import More from "@iconify-icons/ep/more-filled";
import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import AddFill from "@iconify-icons/ri/add-circle-line";

import { useColumns } from "./columns";

const {
  columns,
  searchform,
  onCurrentChange,
  onSizeChange,
  resetForm,
  onSearch,
  handleDelete,
  pagination,
  dataList,
  loading
} = useColumns();

const searchFormRef = ref();

const router = useRouter();

// 新增
function handleAdd() {
  useMultiTagsStoreHook().handleTags("push", {
    path: `/demo/table/edit`,
    name: "人员新增",
    query: { id: 1 },
    meta: {
      title: "人员新增",
      // 最大打开标签数
      dynamicLevel: 3
    }
  });
  // 路由跳转
  router.push({ name: "人员新增", query: { id: 1 } });
}
</script>
<template>
  <el-card>
    <!-- <RzLayout>
    <template #content> -->
    <el-form
      ref="searchFormRef"
      :inline="true"
      :model="searchform"
      class="bg-bg_color w-[99/100] pl-4 pt-4"
    >
      <el-form-item prop="username">
        <el-input
          v-model="searchform.username"
          placeholder="请输入人员姓名"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="searchform.mobile"
          placeholder="请输入手机号"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item prop="sex">
        <el-select
          v-model="searchform.sex"
          placeholder="请选择性别"
          clearable
          class="!w-[180px]"
        >
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
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
    <PureTableBar title="用户管理" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="handleAdd"
        >
          新增用户
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
              link
              type="primary"
              :icon="useRenderIcon(EditPen)"
              @click="handleUpdate(row)"
              >修改
            </el-button>
            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
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
                @click="handleUpdate(row)"
                :icon="useRenderIcon(More)"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      :class="buttonClass"
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
                      :class="buttonClass"
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
    <!-- </template>
  </RzLayout> -->
  </el-card>
</template>
