/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 13:49:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 16:32:29
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
      label: "管理员姓名",
      prop: "username"
    },
    {
      label: "手机号",
      prop: "mobile"
    },
    {
      label: "角色",
      prop: "roleNameList",
      cellRenderer: ({ row }) => <div>{row.roleNameList.toString()}</div>
    },
    {
      label: "状态",
      prop: "status",
      cellRenderer: ({ row }) => (
        <div>
          <el-tag type={row.status === 1 ? "" : "danger"}>
            {row.status == 1 ? "正常" : "禁用"}
          </el-tag>
        </div>
      )
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
    username: "",
    orderField: "create_date",
    order: "desc"
  });
  // 配置接口地址
  mixinViewModuleOptions.getDataListURL = "sys/user/page";
  mixinViewModuleOptions.deleteURL = "sys/user/delete";
  mixinViewModuleOptions.exportURL = "sys/user/export";
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
