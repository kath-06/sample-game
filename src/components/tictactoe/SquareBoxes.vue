<template>
    <el-row class="w-64 md:w-72" justify="center">
        <el-col v-for="square in squares" :key="square.keyIndex" :span="8">
            <div
                :class="square.class"
                @click="nextSquareValue(square.keyIndex)">
                {{square.text}}
            </div>
        </el-col>
    </el-row>
</template>
<script setup>

defineProps({
    squares: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['nextSquareValue'])

const nextSquareValue = (keyIndex) => {
    emit('nextSquareValue', keyIndex);
}

</script>