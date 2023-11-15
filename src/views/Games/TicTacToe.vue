<template>
  <div class="container-flex-col">
    <div class="h-24 mt-4 lg:mb-4">
      <span class="title2-white"> TicTacToe </span>
    </div>
    <div class="flex justify-center content-center">
      <square-boxes
        :squares="squares"
        :rows="gameType.rows"
        :columns="gameType.columns"
        @next-square-value="nextSquareValue"
      />
    </div>
    <div>
      <game-result :next-player="nextPlayer" :nextShape="nextShape" :game-result="result" />
    </div>
    <div class="button-container">
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
          type="danger"
          transition="fade-right-in"
          @button-click="back"
        >
          Back
        </main-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTictactoeStore } from "../../store/tictactoe";
import { useGameTypeStore } from "../../store/gameType";

const router = useRouter();
const tictactoeStore = useTictactoeStore();
const gameTypeStore = useGameTypeStore();
const routerId = ref<any>(router.currentRoute.value.params.id);

let currentValue = ref<any>(0);
let xIsNext = ref<boolean>(false);
let winner = ref<string>("");
let winnerKeys = reactive<any>([]);
let result = ref<string>("");
let currentShape = ref<string>("X");
let currentPlayer = ref<string>("");
let nextShape = ref<string>("X");
let nextPlayer = ref<string>("");
let isEmpty = ref<boolean>(true);
let squares = reactive<any>([]);
let shapes = reactive<any>([]);
let gameType = reactive<any>([]);
let gamePlayers = reactive<any>([]);
let players = reactive<any>([])

const back = () => {
  router.push("/");
  localStorage.removeItem('players');
};

const restartGame = () => {
  currentValue.value = 0;
  xIsNext.value = false;
  winner.value = "";
  result.value = "";
  currentShape.value = players[0].shape;
  currentPlayer.value = players[0].playerName
  nextShape.value = players[0].shape;
  nextPlayer.value = players[0].playerName;
  isEmpty.value = true;
  setTictactoeSquare();
};

const nextSquareValue = (index: any) => {
  if (!squares[index].text && !winner.value) {
    xIsNext.value = currentValue.value % 2 === 0;
    currentValue.value = !currentValue.value;
    currentShape.value = nextShape.value;
    currentPlayer.value = nextPlayer.value
    nextShape.value = xIsNext.value ? players[1].shape : players[0].shape;
    nextPlayer.value = xIsNext.value ? players[1].playerName : players[0].playerName;
    squares[index].text = xIsNext.value ? players[0].shape : players[1].shape;
  }
  checkWinner();
  checkEmptySquares();
  if (!winner.value && !isEmpty.value) {
    result.value = "Draw";
    currentShape.value = "";
    currentPlayer.value = "";
    nextShape.value = "";
    nextPlayer.value = "";
  } else if (winner.value) {
    result.value = `${currentPlayer.value} (${winner.value}) wins`;
    currentShape.value = "";
    currentPlayer.value = "";
    nextShape.value = "";
    nextPlayer.value = "";
  }
};

const checkWinner = () => {
  const numRow = gameType.rows * gameType.columns;
  let squareKeys = [];
  let numKey = 0;
  let setNum = 0;
  let count = 0;
  for (let row = 0; row < numRow; row++) {
    const setColumns = [];
    count = row - parseInt(gameType.rows);
    for (let col = 0; col < gameType.columns; col++) {
      if (setNum === 0) {
        setColumns.push(numKey);
      } else if (setNum === 1) {
        setColumns.push(count === 0 ? count : count);
        count = count + parseInt(gameType.rows);
      } else if (setNum === 2) {
        const key = (parseInt(gameType.rows) + 1) * col;
        setColumns.push(key);
        if (col === parseInt(gameType.rows) - 1) {
          setNum = setNum + 1;
        }
      } else if (setNum === 3) {
        const key = 2 * (col + 1);
        setColumns.push(key);
      }
      numKey = numKey + 1;
      if (numKey === numRow) {
        numKey = 0;
        setNum = setNum + 1;
      }
      if (count >= numRow) {
        count = 0;
      }
    }
    if (row < gameType.rows * 2 + 2) {
      squareKeys.push(setColumns);
    }
  }

  squareKeys.map((keys) => {
    if (allValueAreSame(keys)) {
      keys.map((key) => {
        winner.value = squares[key].text;
        squares[key].class = "primary-square rotate-y-in";
      });
    }
  });
};

const allValueAreSame = (value: any) => {
  let isSame = false;

  if (value.length > 0) {
    const firstValue = currentShape.value;

    isSame = true;
    value.map((key: any) => {
      if (firstValue === squares[key].text && isSame) {
        isSame = true;
      } else {
        isSame = false;
      }
    });
  }

  return isSame;
};

const checkEmptySquares = () => {
  let squareEmpty = false;

  squares.map((square: { text: any }) => {
    if (!square.text) {
      squareEmpty = true;
    }
  });
  isEmpty.value = squareEmpty;
};
const setTictactoeSquare = () => {
  const squareCount = gameType.rows * gameType.columns;

  tictactoeStore.setSquares(squareCount, "default-square", "");
  squares.length = 0;
  Object.assign(squares, tictactoeStore.getSquares);
};
const getType = () => {
  gameTypeStore.getGameTypeData(routerId.value);
  gameType.length = 0;
  Object.assign(gameType, gameTypeStore.getGameType);
};
const getLocalStorage = () => {
  tictactoeStore.getShapeList();
  const getPlayer : any = localStorage.getItem('players');
  const getShapes : any = tictactoeStore.getShapes;
  const setPlayers = JSON.parse(getPlayer);

  players.length = 0;
  shapes.length = 0;
  setPlayers.map((item : any) => {
    const setShapes = getShapes.filter((shape : any) => item.shapeReference === shape.id)[0]
    if (setShapes) {
      players.push({...item, shape: setShapes.shape, shapeColor: setShapes.shapeColor, shapeName: setShapes.shapeName})
    }
  })
  if(players) {
    currentShape.value = players[0].shape;
    currentPlayer.value = players[0].playerName
    nextShape.value = players[0].shape;
    nextPlayer.value = players[0].playerName
  }
}

watchEffect(() => {
  getType();
  setTictactoeSquare();
  getLocalStorage();
});

onMounted(() => {
  getType();
  setTictactoeSquare();
  getLocalStorage();
});
</script>