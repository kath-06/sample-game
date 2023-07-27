import { createRouter, createWebHistory } from "vue-router";
import Default from "../layouts/Default.vue";
import Home from "../views/Games/GameMenu.vue";
import TicTacToe from "../views/Games/TicTacToe.vue";

const routes = [
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '/',
                name: 'Games',
                component: Home
            },
            {
                path: '/tictactoe',
                name: 'TicTacToe',
                component: TicTacToe
            }
        ]
    }
]

console.log(createWebHistory())

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
