<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-11 13:05:24
 * @Descripttion: 
-->
<script setup lang="ts">
import { getUserList } from "@/api/demo";
import { ref, onMounted, reactive } from "vue";
// import type { LoadingConfig, Align } from "@pureadmin/table";
import { useColumns } from "./columns";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PureTableBar } from "@/components/RePureTableBar";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { useRouter } from "vue-router";
// 图标
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import More from "@iconify-icons/ep/more-filled";
import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import AddFill from "@iconify-icons/ri/add-circle-line";

const { columns, pagination } = useColumns();

const dataList = ref([]);
const loading = ref(true);
const searchform = reactive({
  username: "",
  sex: "",
  mobile: ""
});
const router = useRouter();
const searchFormRef = ref();

// 获取表格list
function getTableList(page = 1) {
  loading.value = true;
  const params = {
    page,
    limit: pagination.pageSize,
    ...searchform
  };
  getUserList(params).then(res => {
    if (res.code == 0) {
      const { data } = res;
      dataList.value = data.records;
      pagination.total = data.total;
      loading.value = false;
      console.log(dataList);
    }
  });
}
// 分页修改
function onCurrentChange(page) {
  getTableList(page);
}
// 分页条数修改
function onSizeChange(e) {
  console.log(e);
  pagination.pageSize = e;
  getTableList(pagination.currentPage);
}
// 搜索
function onSearch() {
  getTableList();
}
// 重置
function resetForm() {}

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
onMounted(() => {
  getTableList();
});
</script>
<template>
  <div>
    <el-form
      ref="searchFormRef"
      :inline="true"
      :model="searchform"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="人员姓名：" prop="username">
        <el-input
          v-model="searchform.username"
          placeholder="请输入人员姓名"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="searchform.mobile"
          placeholder="请输入手机号"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
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
            <el-popconfirm title="是否确认删除?">
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                  @click="handleDelete(row)"
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
  </div>
</template>
