<template>
    <div class="page-container">
        <game-card v-for="(game, index) in gameList" :key="index">
            <div class="title-primary">
                {{ game.title }}
            </div>
            <div class="mt-9">
                <main-button button-type="primary" rounded @button-click="gameLink(game.link)">
                    Play
                </main-button>
            </div>
        </game-card>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const gameList = ref([
    { title: 'TicTacToe', link: '/tictactoe' }
])

const gameLink = (link: string) => {
    router.push(link)
}
</script>
