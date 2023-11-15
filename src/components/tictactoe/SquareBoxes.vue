<template>
  <div class="flex">
    <div class="w-16 md:w-20" v-for="(box, index) in boxes" :key="index">
      <div
        v-for="square in box"
        :key="square.keyIndex"
        :class="square.class"
        :style="{ 'color': square.color ? square.color : '#ffffff' }"
        @click="nextSquareValue(square.keyIndex)"
      >
        {{ square.text }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, watchEffect } from "vue";

const props = defineProps({
  squares: {
    type: Object,
    required: true,
  },
  rows: {
    type: [Number, String],
    default: 0,
  },
  columns: {
    type: [Number, String],
    default: 0,
  },
});

const emit = defineEmits(["nextSquareValue"]);

let boxes = reactive<any>([]);

const nextSquareValue = (keyIndex: any) => {
  emit("nextSquareValue", keyIndex);
};
const setBoxes = () => {
  let count = 0;
  boxes.length = 0;
  for (let row = 0; row < props.rows; row++) {
    const setColumns = [];
    for (let col = 0; col < props.columns; col++) {
      const data = props.squares.filter(
        (square: any) => square.keyIndex === count
      );
      setColumns.push({ ...data[0] });
      count = count + 1;
    }
    boxes.push(setColumns);
  }
};

watchEffect(() => {
  setBoxes()
});

onMounted(() => {
  setBoxes();
});
</script>