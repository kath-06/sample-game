<template>
  <el-button
    v-if="!icon"
    :class="btnType(type, rounded) + ` ${transition} main-btn`"
    @click="onClick"
  >
    <slot />
  </el-button>
  <el-button
    v-else-if="icon"
    :class="btnType(type, rounded) + ` ${transition}`"
    :circle="circle"
    :icon="icon"
    @click="onClick"
  />
</template>
<script lang="ts" setup>
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
  width: 150px;
}
</style>