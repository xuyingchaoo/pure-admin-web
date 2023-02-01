<!--
 * @Author: xuyingchao
 * @Date: 2023-01-31 17:19:13
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-01 17:17:38
 * @Descripttion: 
-->
<script setup lang="ts">
import { useRenderIcon } from "@/components/Re/ReIcon/src/hooks";
// 图标
import AddFill from "@iconify-icons/ri/add-circle-line";
import Delete from "@iconify-icons/ep/delete";
import { useEditColumns } from "./index";
import { message } from "@/utils/message";

const { columns, tableRowClassName } = useEditColumns();
const dataList = ref([]); // 表格数据
const options = ref([]); // select下拉选择项
const timeStr = ref(); // 时间戳刷新表格
// 选择框更新
function handleUpdate(data) {
  console.log(data);
}
// 添加一行
function handleAdd() {
  const row = {
    text: "",
    number: "",
    select: ""
  };
  dataList.value.push(row);
}
// 删除行
function handleDelete(index) {
  // 由于表格中自定义组件关系 值不会更新 需要手动刷新
  timeStr.value = new Date().getTime();
  dataList.value.splice(index, 1);
}
// 提交
function handleSubmit() {
  let flag = false;
  dataList.value.map(item => {
    if (!item.number) {
      flag = true;
      item.error = true;
    } else {
      item.error = false;
    }
  });
  if (flag) {
    message(`请将表格填写完整!`, {
      type: "warning"
    });
  }
}

onBeforeMount(() => {
  setTimeout(() => {
    options.value = [
      { id: 1, name: "王宝宝" },
      { id: 2, name: "张包包" },
      { id: 3, name: "钱巴巴" }
    ];
    dataList.value = [
      {
        text: "张三",
        number: 123,
        select: 1
      },
      {
        text: "",
        number: "",
        select: ""
      }
    ];
  }, 500);
});
</script>
<template>
  <div>
    <rz-layout type="list">
      <template #content>
        <el-card class="flex-1">
          <div class="table-add-row mb-4">
            <el-button
              type="primary"
              :icon="useRenderIcon(AddFill)"
              @click="handleAdd()"
            >
              新增
            </el-button>
          </div>
          <pure-table
            border
            stripe
            table-layout="auto"
            row-key="id"
            showOverflowTooltip
            :data="dataList"
            :columns="columns"
            :key="timeStr"
            :row-class-name="tableRowClassName"
          >
            <template #inputNumber="{ row }">
              <rz-number-input
                :defaultValue="row.number"
                v-model:value="row.number"
                :fixedMaxLen="2"
                :max="1000"
                :min="100"
              />
            </template>
            <template #select="{ row, index }">
              <rz-table-select
                name="select"
                :defaultValue="row.select"
                v-model:value="row.select"
                v-model:valueInfo="row.selectRow"
                :options="options"
                :index="index"
                @update="handleUpdate"
              />
            </template>
            <template #operation="{ index }">
              <el-button
                link
                type="danger"
                :icon="useRenderIcon(Delete)"
                @click="handleDelete(index)"
              >
                删除
              </el-button>
            </template>
          </pure-table>
          <el-button class="mt-4" type="primary" @click="handleSubmit()">
            提交
          </el-button>
          <div style="border: 1px solid #ccc; margin: 20px; padding: 20px">
            {{ JSON.stringify(dataList) }}
          </div>
        </el-card>
      </template>
    </rz-layout>
  </div>
</template>
