<template>
  <div
    class="sm-primary-line-card"
    :class="isWinner ? winnerClass : ''"
  >
    <div class="text-2xl font-bold" :class="isWinner ? 'text-sky-500' : 'text-sky-900'">
      {{ title }} {{ isWinner ? ' Wins' : '' }}
    </div>
    <div
      v-if="player"
      class="text-xl p-2 font-bold"
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
  },
  isWinner: {
    type: Boolean,
    default: false
  }
})

const winnerClass = 'ring-4 ring-sky-500 ring-offset-4 bg-slate-800'
</script>
