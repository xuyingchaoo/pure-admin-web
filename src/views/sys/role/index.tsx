/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 13:49:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 13:40:06
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
export function roleColumns() {
  /** 表格列 */
  const columns: TableColumnList = [
    {
      label: "序号",
      type: "index",
      width: 60,
      align: "center"
    },
    {
      label: "角色名称",
      prop: "name"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "创建时间",
      prop: "createDate"
    },
    {
      label: "操作",
      slot: "operation",
      fixed: "right",
      width: 260
    }
  ];
  const searchForm = reactive({
    name: "",
    orderField: "create_date",
    order: "desc"
  });
  // 配置接口地址
  mixinViewModuleOptions.getDataListURL = "sys/role/page";
  mixinViewModuleOptions.deleteURL = "sys/role/delete";
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
