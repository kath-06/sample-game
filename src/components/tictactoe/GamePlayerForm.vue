<template>
  <kath-dialog :visible="visible" title="Choose Player">
    <template #body>
      <el-form
        ref="gamePlayerFormRef"
        :model="gamePlayer"
        :rules="gamePlayerRules"
        :disabled="loading"
      >
        <el-row class="w-full" :gutter="10">
          <el-col
            :span="24"
            v-for="(game, index) in gamePlayer"
            :key="index"
          >
            <el-form-item :label="`Player ${index + 1}`" :prop="game.value">
              <el-select
                v-model="game.value"
                placeholder="Select"
                clearable
                :loading="formLoading"
                @change="changePlayerOptions(game.index, game.value)"
              >
                <el-option
                  v-for="(player, playerIndex) in game.playerOptions"
                  :key="playerIndex"
                  :label="player.playerName"
                  :value="player.id"
                >
                  {{ player.playerName }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <main-button
        class="mr-1 ml-1"
        rounded
        type="default"
        translate="fade-right-in"
        icon="Check"
        :loading="loading"
        @button-click="onSubmit"
      >
        Play Now
      </main-button>
      <main-button
        class="mr-1 ml-1"
        rounded
        type="danger"
        translate="fade-right-in"
        icon="Close"
        :disabled="loading"
        @button-click="onCancel"
      >
        Cancel
      </main-button>
    </template>
  </kath-dialog>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  watchEffect,
} from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  players: {
    type: Array,
    default: [],
  },
  typeRow: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["onCancel", "onSubmit"]);

const gamePlayerFormRef = ref();
const gamePlayerRules = reactive<any>({
  player: [{ required: true, message: "Player is required", trigger: "blur" }],
});

let playerOptions = ref<any>(props.players);
let formLoading = ref<any>(props.loading);
let numOfPlayer = ref<number>(0);
let gamePlayer = reactive<any>([]);
let choosePlayer = reactive<any>([]);

const onCancel = () => {
  emit("onCancel");
};
const onSubmit = () => {
  const submitParams = {
    player: choosePlayer,
    players: playerOptions.value
  };
  emit("onSubmit", gamePlayerFormRef.value, submitParams);
};
const searchPlayers = (query: string) => {
  if (query) {
    playerOptions.value = props.players.filter((item: any) => {
      return item.playerName.toLowerCase().includes(query.toLowerCase());
    });
  } else if (!gamePlayer.player) {
    playerOptions.value = { ...props.players };
  } else {
    playerOptions.value = [];
  }
};
const setGamePlayers = () => {
  for (let player = 0; player < numOfPlayer.value; player++) {
    gamePlayer.push({
      index: player,
      value: "",
      playerOptions: { ...props.players },
    });
  }
};
const changePlayerOptions = (index: any, plyId: any) => {
  choosePlayer.push({ index: plyId });
  gamePlayer.map((player: any) => {
    if (player.index !== index) {
      let options = Object.values(playerOptions.value);

      player.playerOptions = options.filter(
        (option: any) => option.id !== plyId
      );
    }
  });
};

watchEffect(() => {
  playerOptions.value = { ...props.players };
  numOfPlayer.value = props.typeRow - 1;
  setGamePlayers();
});
</script>
