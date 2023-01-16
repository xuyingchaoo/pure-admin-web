/*
 * @Author: xuyingchao
 * @Date: 2023-01-12 13:22:37
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 17:31:09
 * @Descripttion:
 */
import { ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { getTableList, doTableDelete } from "@/api/common";
import { message } from "@/utils/message";

const mixinViewModuleOptions = reactive({
  getDataListURL: "", // 数据列表接口，API地址
  deleteURL: "", // 删除接口，API地址
  exportURL: "", // 导出接口，API地址
  needOrder: false // 是否需要排序
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
          console.log("params", params);
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

function doDelete(params) {
  console.log(params);
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
      getTableData(params);
    } else {
      loading.value = false;
      message(res.msg, {
        type: "error"
      });
    }
    console.log(res);
  });
}

export {
  getTableData,
  onCurrentChange,
  onSizeChange,
  doDelete,
  mixinViewModuleOptions,
  pagination,
  dataList,
  loading
};
