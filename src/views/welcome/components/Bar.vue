<!--
 * @Author: xuyingchao
 * @Date: 2023-02-06 16:56:35
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-07 08:59:49
 * @Descripttion: 
-->
<script setup lang="ts">
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      containLabel: true,
      top: "10px",
      bottom: "0",
      left: "0",
      right: "0"
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0
          // width: "70",
          // overflow: "truncate"
        },
        data: ["open_issues", "forks", "watchers", "star"],
        triggerEvent: true
      }
    ],
    yAxis: [
      {
        type: "value",
        triggerEvent: true
      }
    ],
    series: [
      {
        name: "GitHub信息",
        type: "bar",
        data: [1000, 10000, 20000, 66666]
      }
    ],
    addTooltip: true
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  }
);

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(360).then(() => resize());
  }
);
</script>

<template>
  <div ref="barChartRef" style="width: 100%; height: 35vh" />
</template>
