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
          @button-click="gameLink(game.link)"
        >
          Play
        </main-button>
      </div>
    </game-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useGameTypeStore } from "../../store/gameType";

const router = useRouter();
const gameTypeStore = useGameTypeStore();

let gameTypes = ref<any>([]);
let gameList = ref<any>([]);

const gameLink = (link: string) => {
  router.push(link);
};
const loadGameType = () => {
  gameTypeStore.getGameTypeList();
  gameTypes.value = gameTypeStore.getGameTypes;
  gameList.value = [];
  if (gameTypes.value) {
    gameTypes.value.map((type: any) => {
      gameList.value.push({
        title: "TicTacToe",
        subtitle: type.typeName,
        link: "/tictactoe/" + type.id,
      });
    });
  }
};

watchEffect(() => loadGameType());

onMounted(() => {
  loadGameType();
});
</script>
