<template>
  <el-dialog
    class="w-11/12 lg:w-4/12 rounded-md"
    :model-value="visible"
    align-center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header>
      <div class="dialog-primary-header rounded-t-md">{{ title }}</div>
    </template>
    <slot name="body" />
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer" />
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
<style>
.dialog-footer button {
  margin-right: 5px !important;
  margin-left: 5px !important;
}
.ep-dialog__header {
  margin: 0px;
  padding: 0px !important;
}
.ep-dialog__footer {
  text-align: center;
  padding: 20px !important;
}
</style>