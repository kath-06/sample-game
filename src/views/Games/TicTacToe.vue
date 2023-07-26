<template>
    <div class="w-full h-full flex flex-col justify-center content-center">
        <div class="h-24 font-serif">
            <span class="text-4xl md:text-6xl tracking-wide">TicTacToe</span>
        </div>
        <div class="flex justify-center content-center">
            <square-boxes :squares="squares" @next-square-value="nextSquareValue" />
        </div>
        <div>
            <game-result :nextPlayer="nextPlayer" :game-result="result" />
            <el-button v-show="result" type="danger" round @click="restartGame">Restart</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

let currentValue = ref<any>(0);
let xIsNext = ref<boolean>(false);
let winner = ref<string>('');
let winnerKeys = ref<any>([]);
let result = ref<string>('');
let nextPlayer = ref<string>('X');
let isEmpty = ref<boolean>(true);
let squareClass = ref<string>('border-2 h-20 text-4xl flex justify-center items-center font-bold border-white');
let squares = ref([
    { keyIndex: 0, text: '', class: squareClass.value },
    { keyIndex: 1, text: '', class: squareClass.value },
    { keyIndex: 2, text: '', class: squareClass.value },
    { keyIndex: 3, text: '', class: squareClass.value },
    { keyIndex: 4, text: '', class: squareClass.value },
    { keyIndex: 5, text: '', class: squareClass.value },
    { keyIndex: 6, text: '', class: squareClass.value },
    { keyIndex: 7, text: '', class: squareClass.value },
    { keyIndex: 8, text: '', class: squareClass.value }
]);

const restartGame = () => {
    currentValue.value = 0;
    xIsNext.value = false;
    winner.value = '';
    result.value = '';
    nextPlayer.value = 'X';
    isEmpty.value = true;
    squares.value.map(square => {
        square.text = '';
        square.class = squareClass.value;
    })
}

const nextSquareValue = (index: any) => {
    if (!squares.value[index].text && !winner.value) {
        xIsNext.value = currentValue.value % 2 === 0;
        currentValue.value = !currentValue.value;
        nextPlayer.value = xIsNext.value ? 'O' : 'X';
        squares.value[index].text = xIsNext.value ? 'X' : 'O';
    }
    checkWinner();
    checkEmptySquares();
    if (!winner.value && !isEmpty.value) {
        result.value = 'Draw';
        nextPlayer.value = '';
    } else if (winner.value) {
        result.value = winner.value + ' wins';
        nextPlayer.value = '';
    }
}

const checkWinner = () => {
    let squareKeys = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    squareKeys.map(keys => {
        const [a, b, c] = keys;

        if (squares.value[a].text && squares.value[a].text === squares.value[b].text && squares.value[a].text === squares.value[c].text) {
            winner.value = squares.value[a].text;
            keys.map(key => {
                squares.value[key].class = squareClass.value + ' bg-red-950 text-yellow-600';
            })
        }
    })
}

const checkEmptySquares = () => {
    let squareEmpty = false;
    squares.value.map(square => {
        if(!square.text) {
            squareEmpty = true;
        }
    })
    isEmpty.value = squareEmpty;
}
</script>