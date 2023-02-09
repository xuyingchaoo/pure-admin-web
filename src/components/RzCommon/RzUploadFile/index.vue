<!--
 * @Author: xuyingchao
 * @Date: 2023-01-28 14:35:21
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 11:11:19
 * @Descripttion: 文件上传组件（可包括视频、图片、文档）
-->
<script setup lang="ts">
import UploadFilled from "@iconify-icons/ep/upload-filled";
import { baseUrlApi } from "@/api/utils";
import { getToken } from "@/utils/auth";
import { message } from "@/utils/message";

const props = defineProps({
  // 上传数量
  limit: {
    require: false,
    type: Number
  },
  // 上传文件大小限制 默认10M
  limitSize: {
    require: false,
    type: Number,
    default: 10
  },
  // 配置上传文件格式 默认文档
  // video/*,audio/*,
  accept: {
    type: String,
    default:
      ".pdf,.xlsx,.xls,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  // 默认提示
  tip: {
    require: false,
    type: String
  }
});
const fileList = ref([]);
const accessToken = getToken().accessToken;
const uploadUrl = baseUrlApi(`oss/upload?token=${accessToken}`); // 上传地址
// const uploadUrl =
//   "https://victory.sl-feather.com/ruiz/admin/oss/upload?token=7782b8f6f6a2fb3a4c2007e0d0bdd644";
// 删除
function handleRemove(file) {
  fileList.value = fileList.value.filter(item => item.uid != file.uid);
}
// 接口上传--上传成功
function uploadFileSuccess(response, file, list) {
  fileList.value = list;
  fileList.value.forEach((item, i) => {
    if (item.uid == file.uid) {
      fileList.value[i].url = response.data;
    }
  });
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
// 对外暴露的属性
defineExpose({
  fileList
});
</script>
<template>
  <div class="rz-upload-video">
    <el-upload
      drag
      multiple
      :accept="accept"
      :limit="limit"
      :action="uploadUrl"
      :on-exceed="handleExceed"
      :on-success="uploadFileSuccess"
      :before-upload="uploadBefore"
      :on-remove="handleRemove"
    >
      <IconifyIconOffline class="el-icon--upload" :icon="UploadFilled" />
      <div class="el-upload__text">将文件拖到此处，或点击上传</div>
      <template #tip>
        <div class="el-upload__tip">{{ props.tip }}</div>
      </template>
    </el-upload>
  </div>
</template>
<style lang="scss">
.rz-upload-video {
  .el-upload-dragger {
    padding: 15px 10px;
  }
  .el-icon--upload {
    font-size: 50px;
    margin-bottom: 0;
    display: inline-block;
  }
}
</style>
