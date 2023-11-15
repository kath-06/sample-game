<template>
  <el-dialog
    class="message-box w-11/12 lg:w-4/12 rounded-md"
    :model-value="visible"
    align-center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header>
      <div :class="getHeaderClass(type) + ' rounded-t-md'">
        {{ headerTitle }}
      </div>
    </template>
    <slot name="body">
      <el-alert
        :class="msgTextClass + ' pt-5 pb-5'"
        :title="message"
        :type="msgTextType"
        show-icon
        center
        :closable="false"
      />
    </slot>
    <template #footer>
      <span class="dialog-footer">
        <main-button
          class="mr-1 ml-1"
          rounded
          type="default"
          translate="fade-right-in"
          icon="Check"
          :loading="loading"
          @button-click="onConfirm"
        >
          {{ confirmButtonText }}
        </main-button>
        <main-button
          class="mr-1 ml-1"
          rounded
          type="danger"
          translate="fade-right-in"
          icon="Close"
          :disabled="loading"
          @button-click="onCancel"
        >
          {{ cancelButtonText }}
        </main-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { messageBoxTypes } from "../../../composables/element";

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  headerTitle: {
    type: String,
    default: "Header Title",
  },
  message: {
    type: String,
    default: "Confirm message",
  },
  cancelButtonText: {
    type: String,
    default: "Cancel",
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
  type: {
    type: String,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onCancel", "onConfirm"]);

const msgBoxClass = ref<string>("");
const msgTextClass = ref<string>("");
const msgTextType = ref<string>("info");

const onCancel = () => {
  emit("onCancel");
};
const onConfirm = () => {
  emit("onConfirm");
};

const getHeaderClass = (type: String) => {
  messageBoxTypes.map((box) => {
    if (box.name === type) {
      msgBoxClass.value = box.headerClass;
      msgTextClass.value = box.msgClass;
      msgTextType.value = box.msgType;
    }
  });

  return msgBoxClass.value;
};
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
.message-box .ep-dialog__body {
  padding: 20px 10px 0px 10px !important;
}
</style>