<template>
  <el-row class="m-8 text-2xl">
    <el-col :span="24">
      <span v-show="nextPlayer || nextShape">
        Next Player: {{nextPlayer}} ({{ nextShape }})
      </span>
    </el-col>
  </el-row>
</template>
<script lang ="ts" setup>

defineProps({
  nextPlayer: {
    type: String,
    default: ''
  },
  nextShape: {
    type: String,
    default: ''
  }
})
</script>