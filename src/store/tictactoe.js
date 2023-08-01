import { defineStore } from 'pinia'

export const useTictactoeStore = defineStore('tictactoeStore', {
    state: () => {
        return {
            squares: []
        }
    },
    getters: {
        getSquares: (state) => state.squares
    },
    actions: {
        setSquares(squareCount, squareClass, squareText) {
            this.squares = []
            for(let i = 0; i < squareCount; i++) {
                this.squares.push({ keyIndex: i, text: squareText, class: squareClass })
            }
        }
    }
})