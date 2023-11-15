<template>
  <div class="page-container">
    <div class="page-header">
      <span class="page-title-primary h-12">
        {{ getRouteName() }}
      </span>
    </div>
    <div class="page-container-1 fade-down-in animate-delay-600">
      <span
        class="w-80 flex justify-center"
        v-for="(card, index) in settingCards"
        :key="index"
      >
        <settings-card
          :title="card.title"
          :subtitle="card.subtitle"
          :icon="card.icon"
          @card-click="cardClick(card)"
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { getRouteName } from "../../utils/routes";
import { useRouter } from "vue-router";

const settingCards = reactive<any>([
  {
    title: "Shapes",
    subtitle: "Add, edit or delete tictactoe shapes",
    icon: {
      class: "icon-default",
      size: 30,
      name: "MagicStick",
    },
    link: "/settings/shapes",
  },
  {
    title: "Players",
    subtitle: "Add, edit or delete tictactoe players",
    icon: {
      class: "icon-default",
      size: 30,
      name: "User",
    },
    link: "/settings/players",
  },
  {
    title: "Game Types",
    subtitle: "Add, edit or delete tictactoe game types",
    icon: {
      class: "icon-default",
      size: 30,
      name: "SwitchFilled",
    },
    link: "/settings/game/types",
  },
]);
const router = useRouter();

const cardClick = (card: any) => {
  router.push(card.link);
};
</script>