/*
 * @Author: xuyingchao
 * @Date: 2023-02-02 09:47:28
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-06 09:54:44
 * @Descripttion:
 */
import { useDataList } from "@/mixins/data-list";
import { resolve } from "path";
const {
  getTableData,
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
      type: "selection",
      align: "left"
    },
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
    }
  ];
  const tableRef = ref();
  const searchForm = reactive({
    username: "",
    sex: ""
  });
  const multipleSelection = ref([]);

  // 配置接口地址
  mixinViewModuleOptions.getDataListURL = "sys/user/page";
  mixinViewModuleOptions.searchForm = searchForm;
  // 搜索
  function onSearch() {
    return new Promise(resolve => {
      getTableData(searchForm).then(list => {
        resolve(list);
      });
    });
  }
  // 分页修改
  function onCurrentChange(currentPage) {
    pagination.currentPage = currentPage;
    onSearch().then(() => {
      toggleSelection(multipleSelection.value);
    });
  }
  // 单行操作选中
  const handleSelectionChange = (selection, row) => {
    console.log("勾选中的row", row);
    let flag = false;
    let i = null;
    multipleSelection.value.forEach((item, index) => {
      if (item.id === row.id) {
        flag = true;
        i = index;
      }
    });
    if (!flag) {
      multipleSelection.value.push(row);
    } else {
      multipleSelection.value.splice(i, 1);
    }
    console.log("勾选后当前选中rows", multipleSelection.value);
  };
  // 全选中/取消
  const selectAllHandle = (rows?: any) => {
    if (rows.length) {
      rows.forEach(row => {
        const list = multipleSelection.value.filter(item => {
          return item.id === row.id;
        });
        if (list.length == 0) {
          multipleSelection.value.push(row);
        }
      });
    } else {
      // 全部取消
      const ids = [];
      dataList.value.map(item => {
        ids.push(item.id);
      });
      const list = multipleSelection.value.filter(item => {
        if (ids.indexOf(item.id) < 0) {
          return item;
        }
      });
      multipleSelection.value = list;
    }
  };
  // 设置选中
  const toggleSelection = (rows?: any) => {
    const { toggleRowSelection, clearSelection } = tableRef.value.getTableRef();
    if (rows) {
      dataList.value.forEach(row => {
        const list = rows.filter(item => {
          return item.id == row.id;
        });
        if (list.length) {
          toggleRowSelection(row, true);
        }
      });
    } else {
      clearSelection();
    }
  };
  return {
    onCurrentChange,
    onSizeChange,
    resetForm,
    onSearch,
    handleDelete,
    handleExportOut,
    handleSelectionChange,
    selectAllHandle,
    toggleSelection,
    searchForm,
    columns,
    pagination,
    dataList,
    loading,
    multipleSelection,
    tableRef
  };
}
