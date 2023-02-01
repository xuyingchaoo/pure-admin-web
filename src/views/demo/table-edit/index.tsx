/*
 * @Author: xuyingchao
 * @Date: 2023-01-31 17:19:25
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-01 17:23:00
 * @Descripttion:
 */
export function useEditColumns() {
  /** 表格列 */
  const columns: TableColumnList = [
    {
      label: "文本输入框",
      prop: "text",
      cellRenderer: ({ row }) => (
        <el-input v-model={row.text} placeholder="请输入" />
      )
    },
    {
      label: "数字输入框",
      prop: "number",
      slot: "inputNumber"
    },
    {
      label: "下拉选择框",
      prop: "select",
      slot: "select"
    },
    {
      label: "操作",
      slot: "operation",
      width: 200,
      fixed: "right",
      align: "center"
    }
  ];
  // 表格错误样式
  function tableRowClassName({ row }) {
    if (row.error) {
      return "error-row";
    }
  }
  return {
    columns,
    tableRowClassName
  };
}
