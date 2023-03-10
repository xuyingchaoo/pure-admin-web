<!--
 * @Author: xuyingchao
 * @Date: 2023-01-28 14:35:21
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-09 11:11:34
 * @Descripttion: 上传图片组件 支持预览
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
    default: "image/*"
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
const dialogVisible = ref(false); // 预览弹窗显隐
const dialogImageUrl = ref(""); // 预览图片地址
// 预览图片
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
}
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
  console.log("上传成功");
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
