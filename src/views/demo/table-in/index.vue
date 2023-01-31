<!--
 * @Author: xuyingchao
 * @Date: 2023-01-09 16:09:15
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-31 11:18:53
 * @Descripttion: 
-->
<script setup lang="ts">
import List from "./list.vue";
import Details from "./details.vue";
import Edit from "./edit.vue";
const showType = ref(1);
const query = ref({});
</script>
<template>
  <div>
    <List
      v-if="showType == 1"
      v-model:showType="showType"
      v-model:query="query"
    />
    <Edit
      v-if="showType == 2"
      v-model:showType="showType"
      v-model:query="query"
    />
    <Details
      class="wiggle"
      v-if="showType == 3"
      v-model:showType="showType"
      v-model:query="query"
    />
  </div>
</template>
