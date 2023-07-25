<template>
    <div class="square-box">
        <el-row class="tictactoe" justify="center">
            <el-col v-for="square in squares" :key="square.keyIndex"  :span="8">
                <div class="square" @click="nextSquareValue(square.keyIndex)">{{square.text}}</div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

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
.square-box {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}
.tictactoe {
    width: 20%;
}
.square {
    border-color: #000000;
    border-width: 1px;
    border-style: solid;
    padding: 5px;
    font-size: 50px;
    font-weight: bold;
    height: 70px;
}
</style>