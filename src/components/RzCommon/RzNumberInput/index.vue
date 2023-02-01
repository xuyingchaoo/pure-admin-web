<!--
 * @Author: xuyingchao
 * @Date: 2023-01-19 13:53:58
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-01 16:58:42
 * @Descripttion: 表格数字输入框
-->
<script setup lang="ts">
const props = defineProps({
  // 默认值
  defaultValue: {
    require: false,
    type: [Number, String]
  },
  // 默认占位
  placeholder: {
    require: false,
    type: String,
    default: "请输入"
  },
  max: {
    require: false,
    type: Number
  },
  min: {
    require: false,
    type: Number
  },
  // 最大保留小数位
  fixedMaxLen: {
    require: false,
    type: Number
  },
  // 是否可以为0 默认可以为0
  canZero: {
    require: false,
    type: Boolean,
    default: true
  },
  // 是否可以输入负数 默认不可以
  lessZero: {
    require: false,
    type: Boolean,
    default: false
  },
  // 是否可编辑 默认可编辑
  disabled: {
    require: false,
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["update:value"]);
const inputValue = ref(props.defaultValue);
const content = ref("");
const visible = ref(false);
// 输入框验证
function handleBlur() {
  content.value = "";
  const value = inputValue.value ? Number(inputValue.value) : inputValue.value;
  const msg: Array<string> = [];
  const { canZero, lessZero, fixedMaxLen, max, min } = props;
  console.log(max);
  if (isNaN(value)) {
    msg.push("只允许输入数字");
    inputValue.value = "";
  } else if (!canZero && value === 0) {
    msg.push("输入不允许为0");
    inputValue.value = "";
  } else if (!lessZero && value < 0) {
    msg.push("输入不允许为负数");
    inputValue.value = "";
  } else if (value && max && max < value) {
    msg.push(`输入不允许大于${max}`);
    inputValue.value = max;
  } else if (value && min && min > value) {
    msg.push(`输入不允许小于${min}`);
    inputValue.value = min;
  } else if (fixedMaxLen && fixedMaxLen > 0) {
    const length = value.toString().split(".")[1]
      ? value.toString().split(".")[1].length
      : 0;
    if (length > fixedMaxLen) {
      msg.push(`最多保留${fixedMaxLen}位小数`);
      inputValue.value = parseFloat(Number(value).toFixed(fixedMaxLen));
    }
  }
  tipShow(msg);
  emit("update:value", value);
}
function tipShow(msg) {
  if (msg.length) {
    content.value = msg[0];
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 1000);
  }
}
</script>
<template>
  <el-popover :visible="visible" width="200" placement="right-end">
    <template #default>
      <div class="rz-popover-tip">{{ content }}</div>
    </template>
    <template #reference>
      <el-input
        v-model="inputValue"
        :placeholder="placeholder"
        @blur="handleBlur"
        :disabled="disabled"
      />
    </template>
  </el-popover>
</template>
<style lang="scss" scoped>
.rz-popover-tip {
  color: red;
}
</style>
