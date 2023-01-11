/*
 * @Author: xuyingchao
 * @Date: 2023-01-10 13:49:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-10 14:21:20
 * @Descripttion:
 */
import { reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";

export function useColumns() {
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
  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 15, 20],
    total: 0,
    align: "right",
    background: true,
    small: false
  });
  return {
    columns,
    pagination
  };
}
