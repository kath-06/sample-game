<template>
  <section v-show="showCard" class="fade-down-out absolute w-1/2 bg-slate-600 rounded-3xl shadow-2xl">
    <div class="p-8 text-center sm:p-12">
      <p class="text-sm font-semibold uppercase tracking-widest text-sky-500">
        {{ title }}
      </p>
      <h2 class="mt-6 text-3xl font-bold">
        {{ gameResult }}
      </h2>
    </div>
  </section>
</template>
<script setup lang="ts">
import { watchEffect, ref } from 'vue';

const props = defineProps({
  showWinner: {
    type: Boolean,
    default: false
  },
  gameResult: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Game Result'
  }
})

let showCard = ref<boolean>(props.showWinner)

watchEffect(() => {
  showCard.value = props.showWinner
  if (props.gameResult) {
    setTimeout(() => {
      showCard.value = false
    }, 4000)
  }
})
</script>