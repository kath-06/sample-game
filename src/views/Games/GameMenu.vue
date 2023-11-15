<template>
  <div class="page-container">
    <game-card v-for="(game, index) in gameList" :key="index">
      <div class="title1-primary">
        {{ game.title }}
      </div>
      <div class="subtitle-primary mt-2">( {{ game.subtitle }} )</div>
      <div class="mt-9">
        <main-button
          button-type="primary"
          rounded
          @button-click="gameLink(game)"
        >
          Play
        </main-button>
      </div>
    </game-card>
    <game-player-form
      :visible="gamePlayerDialog"
      :loading="loading"
      :players="players"
      :typeRow="typeRow"
      @on-cancel="gamePlayerDialog = false"
      @on-submit="submitGamePlayer"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import { useGameTypeStore } from "../../store/gameType";
import { usePlayerStore } from "../../store/players";
import { FormInstance } from "element-plus/es/components/form";

const router = useRouter();
const gameTypeStore = useGameTypeStore();
const playerStore = usePlayerStore();

let gameTypes = reactive<any>([]);
let gameList = reactive<any>([]);
let gamePlayerDialog = ref<boolean>(false);
let loading = ref<boolean>(false);
let pageLink = ref<any>();
let players = reactive<any>([]);
let typeRow = ref<number>(0);

const gameLink = (game: any) => {
  gamePlayerDialog.value = true;
  pageLink.value = game.link;
  typeRow.value = parseInt(game.typeRow);
};
const submitGamePlayer = async (formEl: FormInstance | undefined, gamePlayer: any) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      const setPlayers : any = [];
      router.push(pageLink.value);
      gamePlayer.player.map((val: any) => {
        setPlayers.push(gamePlayer.players[val.index])
      })
      localStorage.setItem('players', JSON.stringify(setPlayers));
    } else {
      console.log("error", fields);
    }
  });
};
const loadGameType = () => {
  gameTypeStore.getGameTypeList();
  Object.assign(gameTypes, gameTypeStore.getGameTypes);
  gameList = [];
  if (gameTypes) {
    gameTypes.map((type: any) => {
      gameList.push({
        title: "TicTacToe",
        subtitle: type.typeName,
        link: "/tictactoe/" + type.id,
        typeRow: type.rows,
      });
    });
  }
  getPlayersData();
};
const getPlayersData = () => {
  players.length = 0;
  loading.value = true;
  playerStore.getPlayerList();
  Object.assign(players, playerStore.getPlayers);
  loading.value = false;
};

watchEffect(() => loadGameType());

onMounted(() => {
  loadGameType();
});
</script>
