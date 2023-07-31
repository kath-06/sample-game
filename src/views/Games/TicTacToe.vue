<template>
    <div class="container-flex-col">
        <div class="h-24 mt-4 lg:mb-4">
            <span class="title2-white">TicTacToe</span>
        </div>
        <div class="flex justify-center content-center">
            <square-boxes :squares="squares" @next-square-value="nextSquareValue" />
        </div>
        <div>
            <game-result :nextPlayer="nextPlayer" :game-result="result" />
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center">
            <div class="mr-0 md:mr-2">
                <main-button
                    v-if="result"
                    rounded
                    type="success"
                    transition="fade-right-in"
                    @button-click="restartGame"
                >
                    Restart
                </main-button>
            </div>
            <div class="mt-2 md:mt-0">
                <main-button
                    rounded
                    type="default"
                    transition="fade-right-in"
                    @button-click="back">
                    Back
                </main-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let currentValue = ref<any>(0);
let xIsNext = ref<boolean>(false);
let winner = ref<string>('');
let winnerKeys = ref<any>([]);
let result = ref<string>('');
let nextPlayer = ref<string>('X');
let isEmpty = ref<boolean>(true);
let squares = ref([
    { keyIndex: 0, text: '', class: 'default-square' },
    { keyIndex: 1, text: '', class: 'default-square' },
    { keyIndex: 2, text: '', class: 'default-square' },
    { keyIndex: 3, text: '', class: 'default-square' },
    { keyIndex: 4, text: '', class: 'default-square' },
    { keyIndex: 5, text: '', class: 'default-square' },
    { keyIndex: 6, text: '', class: 'default-square' },
    { keyIndex: 7, text: '', class: 'default-square' },
    { keyIndex: 8, text: '', class: 'default-square' }
]);

const back = () => {
    router.push('/home')
}

const restartGame = () => {
    currentValue.value = 0;
    xIsNext.value = false;
    winner.value = '';
    result.value = '';
    nextPlayer.value = 'X';
    isEmpty.value = true;
    squares.value.map(square => {
        square.text = '';
        square.class = 'default-square';
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
                squares.value[key].class = 'primary-square rotate-y-in';
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