/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 13:49:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 16:54:54
 * @Descripttion:
 */
import {
  getTableData,
  onCurrentChange,
  onSizeChange,
  mixinViewModuleOptions,
  pagination,
  dataList,
  loading,
  doDelete
} from "@/mixins/data-list";

export function useColumns() {
  // 配置接口地址
  mixinViewModuleOptions.getDataListURL = "sys/user/page";
  mixinViewModuleOptions.deleteURL = "sys/user/delete";

  /** 表格列 */
  const columns: TableColumnList = [
    {
      label: "姓名",
      prop: "username"
    },
    {
      label: "性别",
      prop: "sex",
      cellRenderer: ({ row }) => <div>{row.sex == 1 ? "男" : "女"}</div>
    },
    {
      label: "手机号",
      prop: "mobile"
    },
    {
      label: "创建日期",
      prop: "createDate"
    },
    {
      label: "操作",
      slot: "operation"
    }
  ];
  const searchform = reactive({
    username: "",
    sex: "",
    mobile: ""
  });
  // 搜索
  function onSearch() {
    getTableData(searchform);
  }
  // 重置
  const resetForm = searchFormRef => {
    if (!searchFormRef) return;
    searchFormRef.resetFields();
    onSearch();
  };
  // 删除
  function handleDelete(row) {
    console.log(row);
    doDelete([row.id]);
  }

  onMounted(() => {
    getTableData(searchform);
  });
  return {
    onCurrentChange,
    onSizeChange,
    resetForm,
    onSearch,
    handleDelete,
    searchform,
    columns,
    pagination,
    dataList,
    loading
  };
}
