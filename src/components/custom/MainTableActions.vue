<template>
  <span v-if="actions.length <= 2">
    <span v-for="(action, index) in actions" :key="index">
      <main-button
        :type="action.type"
        :icon="action.icon"
        circle
        @click="onClick(action.action)"
      />
    </span>
  </span>
  <el-dropdown v-else-if="actions.length > 2" trigger="click">
    <span class="btn-default-tbl-dropdown">
      <el-icon class="el-icon--left">
        <more />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          class="default-tbl-dropdown-item"
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
const props = defineProps({
  actions: {
    type: Array,
    default: [],
  },
  data: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["onClick"]);

const onClick = (action: string) => {
  emit("onClick", props.data, action);
};
</script>