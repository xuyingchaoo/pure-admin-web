<!--
 * @Author: xuyingchao
 * @Date: 2023-01-28 14:35:21
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-29 16:11:03
 * @Descripttion: 
-->
<script setup lang="ts">
import Refresh from "@iconify-icons/ep/plus";
import { baseUrlApi } from "@/api/utils";
import { getToken } from "@/utils/auth";
import { message } from "@/utils/message";

const props = defineProps({
  // 上传数量
  limit: {
    require: false,
    type: Number
  },
  // 上传图片大小限制 默认2M
  limitSize: {
    require: false,
    type: Number,
    default: 2
  },
  // 上传图片格式
  accept: {
    type: String,
    default:
      "image/*,video/*,audio/*,.pdf,.xlsx,.xls,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  // 默认提示
  tip: {
    require: false,
    type: String
  },
  fileListDefault: {
    require: false,
    type: Array
  }
});
let fileList = [];

const accessToken = getToken().accessToken;
const uploadUrl = baseUrlApi(`oss/upload?token=${accessToken}`); // 上传地址
const dialogVisible = ref(false); // 预览弹窗显隐
const dialogImageUrl = ref(""); // 预览图片地址
const emit = defineEmits(["update:fileListDefault"]);
// 编辑时候赋值，通过监听fileListDefault，给fileList赋值
// watch(
//   () => props.fileListDefault,
//   newValue => {
//     console.log("newValue", newValue);
//     // const _fileList = [];
//     // newValue.forEach(item => {
//     //   _fileList.push({ url: item });
//     // });
//     // fileList = _fileList;
//   }
// );
// 预览图片
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
}
// 删除
function handleRemove(file) {
  fileList = fileList.filter(item => item.uid != file.uid);
  refreshData();
}
// 接口上传--上传成功
function uploadFileSuccess(response, file, list) {
  fileList = list;
  fileList.forEach((item, i) => {
    if (item.uid == file.uid) {
      fileList[i].url = response.data;
    }
  });
  refreshData();
}
function refreshData() {
  emit("update:fileListDefault", fileList);
}
// 上传文件之前校验格式和大小
function uploadBefore(file) {
  return new Promise((resolve, reject) => {
    //判断大小限制
    const isLimitSize = file.size / 1024 / 1024 < props.limitSize;
    if (!isLimitSize) {
      message(`大小不能超过${props.limitSize}MB!`, {
        type: "warning"
      });
      reject(false);
    }
    // 判断图片格式
    const isJPG = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg"
    ].includes(file.type);
    if (!isJPG) {
      message(`上传图片只能是 JPG、JPEG、PNG、GIF 格式!`, {
        type: "error"
      });
      reject(false);
    } else {
      resolve(true);
    }
  });
}
// 限制
function handleExceed() {
  message(`数量达到上限!`, {
    type: "warning"
  });
}
</script>
<template>
  <div class="rz-upload-img">
    <el-dialog class="upload-view" v-model="dialogVisible" width="800">
      <el-scrollbar height="600px">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-scrollbar>
    </el-dialog>
    <el-upload
      v-model:file-list="fileList"
      :limit="limit"
      :on-exceed="handleExceed"
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadFileSuccess"
      :before-upload="uploadBefore"
      :accept="accept"
    >
      <!-- 单独使用图标 -->
      <IconifyIconOffline :icon="Refresh" />
      <template #tip>
        <div class="tip-info">{{ props.tip }}</div>
      </template>
    </el-upload>
  </div>
</template>
<style lang="scss">
.rz-upload-img {
  .el-upload,
  .el-upload-list__item {
    width: 100px !important;
    height: 100px !important;
  }
  .el-upload-list--picture-card .el-progress {
    width: 100px;
    .el-progress-circle {
      width: 100px !important;
      height: 100px !important;
    }
  }
  // 上传提示
  .tip-info {
    color: #919191;
    font-size: 12px;
  }
  //预览弹窗
  .upload-view {
    .el-dialog__body {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
