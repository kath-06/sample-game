<template>
    <el-row class="w-72" justify="center">
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
<style scoped>
.square {
    border-color: #ffffff;
    border-width: 1px;
    border-style: solid;
    padding: 5px;
    font-size: 50px;
    font-weight: bold;
    height: 70px;
}
.winner-square {
    border-color: #ffffff;
    border-width: 1px;
    border-style: solid;
    padding: 5px;
    font-size: 50px;
    font-weight: bold;
    height: 70px;
    background-color: #740001;
    color: #eeba30;
}
</style>