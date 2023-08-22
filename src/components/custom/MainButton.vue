<template>
  <el-button
    v-if="!showIconOnly"
    :class="btnType(type, rounded) + ` ${transition} main-btn lg:visible`"
    :icon="icon"
    :loading="loading"
    @click="onClick"
  >
    <slot />
  </el-button>
  <el-button
    v-else-if="showIconOnly"
    :class="btnType(type, rounded) + ` ${transition}`"
    :circle="circle"
    :icon="icon"
    :loading="loading"
    @click="onClick"
  />
</template>
<script lang="ts" setup>
import { fa } from "element-plus/es/locale";
import { buttonTypes } from "~/composables";

defineProps({
  type: {
    type: String,
    default: "primary",
  },
  transition: {
    type: String,
    default: "",
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  showIconOnly: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["buttonClick"]);

const onClick = () => {
  emit("buttonClick");
};

const btnType = (type: string, rounded: boolean) => {
  let btnClass = "";

  buttonTypes.map((btnType) => {
    if (btnType.name === type) {
      btnClass = rounded ? btnType.roundClass : btnType.class;
    }
  });

  return btnClass;
};
</script>
<style scoped>
.main-btn {
  width: 120px;
}
</style>