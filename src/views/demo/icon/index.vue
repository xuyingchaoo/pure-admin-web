<script setup lang="ts">
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { useRenderIcon } from "@/components/Re/ReIcon/src/hooks";
</script>
<template>
  <div>
    <!-- 按钮图标 -->
    <el-button type="primary" :icon="useRenderIcon(Search)">搜索</el-button>

    <!-- 单独使用图标 -->
    <IconifyIconOffline :icon="Search" />

    <!-- 使用在线图标 -->
    <IconifyIconOnline
      icon="openmoji:beaming-face-with-smiling-eyes"
      width="60px"
      height="60px"
    />
  </div>
</template>
