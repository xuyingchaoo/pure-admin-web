/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 13:49:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-01 09:15:04
 * @Descripttion:
 */
import { useDataList } from "@/mixins/data-list";
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
      label: "姓名",
      prop: "username"
    },
    {
      label: "头像",
      prop: "avatarUrl",
      cellRenderer: ({ row }) => (
        <el-avatar size={40} fit="cover" src={row.avatarUrl} />
      )
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
  const searchForm = reactive({
    username: "",
    sex: "",
    mobile: "",
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
