<template>
    <div class="w-full h-full flex flex-wrap flex-col md:flex-row justify-center items-center">
        <game-card v-for="(game, index) in gameList" :key="index">
            <div class="text-3xl text-sky-900 font-bold">
                {{ game.title }}
            </div>
            <div class="mt-9">
                <main-button @button-click="gameLink(game.link)">
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
