<template>
  <span v-if="actions.length <= 2">
    <span v-for="(action, index) in actions" :key="index">
      <main-button
        :type="action.type"
        :icon="action.icon"
        :show-icon-only="true"
        circle
        @click="onClick(action.action)"
      />
    </span>
  </span>
  <el-dropdown v-else-if="actions.length > 2" trigger="click">
    <span :class="getDropdownClass(actionType)">
      <el-icon class="el-icon--left">
        <more />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :class="dropdownItemClass"
          v-for="(action, index) in actions"
          :key="index"
          :icon="action.icon"
          @click="onClick(action.action)"
        >
          {{ action.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { tableTypes } from "../../composables/element";

const props = defineProps({
  actions: {
    type: Array,
    default: [],
  },
  data: {
    type: Object,
    default: {},
  },
  actionType: {
    type: String,
    default: "primary",
  },
});
const emit = defineEmits(["onClick"]);

let dropdownItemClass = ref<string>("");

const onClick = (action: string) => {
  emit("onClick", props.data, action);
};
const getDropdownClass = (type: string) => {
  let dropdownClass = "";
  tableTypes.map((tblType) => {
    if (tblType.name === type) {
      dropdownClass = tblType.dropdownClass;
      dropdownItemClass.value = tblType.dropdownItemClass;
    }
  });
  return dropdownClass;
};
</script>