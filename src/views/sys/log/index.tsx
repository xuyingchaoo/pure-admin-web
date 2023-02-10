/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 13:49:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 16:22:29
 * @Descripttion:
 */
import { useDataList } from "@/utils/data-list";
const {
  getTableData,
  onCurrentChange,
  onSizeChange,
  mixinViewModuleOptions,
  pagination,
  dataList,
  loading,
  handleDelete,
  resetForm,
  handleExportOut
} = useDataList();
export function useColumns() {
  /** 表格列 */
  const columns: TableColumnList = [
    {
      label: "序号",
      type: "index",
      width: 60,
      align: "center"
    },
    {
      label: "操作",
      prop: "operation"
    },
    {
      label: "操作人员",
      prop: "username"
    },
    {
      label: "ip",
      prop: "ip"
    },
    {
      label: "操作时间",
      prop: "createDate"
    }
  ];
  const searchForm = reactive({
    username: "",
    orderField: "create_date",
    order: "desc"
  });
  // 配置接口地址
  mixinViewModuleOptions.getDataListURL = "sys/logs/page";
  mixinViewModuleOptions.searchForm = searchForm;
  // 搜索
  function onSearch() {
    getTableData(searchForm);
  }

  onMounted(() => {
    getTableData(searchForm);
  });
  return {
    onCurrentChange,
    onSizeChange,
    resetForm,
    onSearch,
    handleDelete,
    handleExportOut,
    searchForm,
    columns,
    pagination,
    dataList,
    loading
  };
}
