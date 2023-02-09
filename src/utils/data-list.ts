/*
 * @Author: xuyingchao
 * @Date: 2023-01-12 13:22:37
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-08 16:11:19
 * @Descripttion:
 */
import { ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { getTableList, doTableDelete } from "@/api/common";
import { message } from "@/utils/message";
import { useCommon } from "@/utils/rzCommon";
const { downLoadExcel } = useCommon();
export function useDataList() {
  const mixinViewModuleOptions = reactive({
    getDataListURL: "", // 数据列表接口，API地址
    deleteURL: "", // 删除接口，API地址
    exportURL: "", // 导出接口，API地址
    needOrder: true, // 是否需要排序
    searchForm: {} // 搜索参数
  });

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

  const loading = ref(true);
  let params: { [key: string]: any } = {};
  const dataList = ref([]);

  // 发起请求
  function getTableData(searchForm) {
    return new Promise(resolve => {
      if (mixinViewModuleOptions.needOrder) {
        searchForm.orderField = searchForm.orderField
          ? searchForm.orderField
          : "create_date";
        searchForm.order = searchForm.order ? searchForm.order : "desc";
      }
      for (const key in searchForm) {
        if (key === "startDates" && searchForm.startDates) {
          if (searchForm.startDates.length > 0) {
            searchForm.startDates = searchForm.startDates.join(",");
          }
        } else if (key === "endDates" && searchForm.endDates) {
          if (searchForm.endDates.length > 0) {
            searchForm.endDates = searchForm.endDates.join(",");
          }
        } else if (key === "dateArray" && searchForm.dateArray) {
          if (searchForm.dateArray.length > 0) {
            searchForm.date = searchForm.dateArray.join(",");
          }
        }
      }
      params = searchForm;
      loading.value = true;
      getTableList({
        url: mixinViewModuleOptions.getDataListURL,
        params: {
          page: pagination.currentPage,
          limit: pagination.pageSize,
          ...searchForm
        }
      }).then(data => {
        if (data.code == 0) {
          const { records, total } = data.data;
          pagination.total = total;
          loading.value = false;
          dataList.value = records;
          resolve(records);
        }
      });
    });
  }

  // 分页修改
  function onCurrentChange(currentPage) {
    pagination.currentPage = currentPage;
    getTableData(params);
  }
  // 分页条数修改
  function onSizeChange(e) {
    pagination.pageSize = e;
    getTableData(params);
  }
  // 删除请求
  function doDelete(params) {
    loading.value = true;
    doTableDelete({
      url: mixinViewModuleOptions.deleteURL,
      params
    }).then(res => {
      if (res.code == 0) {
        loading.value = false;
        message("删除成功！", {
          type: "success"
        });
        getTableData(mixinViewModuleOptions.searchForm);
      } else {
        loading.value = false;
        message(res.msg, {
          type: "error"
        });
      }
    });
  }

  // 删除
  function handleDelete(row) {
    doDelete([row.id]);
  }
  // 重置
  function resetForm(searchFormRef) {
    if (!searchFormRef) return;
    searchFormRef.resetFields();
    getTableData(mixinViewModuleOptions.searchForm);
  }
  // 导出
  function handleExportOut() {
    downLoadExcel(mixinViewModuleOptions.exportURL, params);
  }

  return {
    getTableData,
    onCurrentChange,
    onSizeChange,
    doDelete,
    handleDelete,
    resetForm,
    handleExportOut,
    mixinViewModuleOptions,
    pagination,
    dataList,
    loading
  };
}
