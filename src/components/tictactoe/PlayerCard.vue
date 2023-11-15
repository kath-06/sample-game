<template>
  <div class="sm-primary-line-card">
    <div class="text-2xl font-bold text-black">
      {{ title }}
    </div>
    <div
      class="text-xl"
      :style="{ 'color': player.shapeColor ? player.shapeColor : '#000000' }"
    >
      {{ player.playerName }} {{ player.shape }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  title: {
    type: String,
    default: 'N/A'
  },
  player: {
    type: Object,
    required: true
  }
})
</script>
