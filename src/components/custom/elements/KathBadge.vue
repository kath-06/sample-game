<template>
  <span
    class="kath-badge"
    :style="'background-color: ' + badgeColor.toString() + ';'"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
defineProps({
  badgeColor: {
    type: String,
    required: true,
  },
});
</script>