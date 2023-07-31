import { createRouter, createWebHistory } from "vue-router";
import Default from "../layouts/Default.vue";
import Loading from "../layouts/LoadingLayout.vue";
import LoadingPage from "../views/Loading.vue";
import Home from "../views/Games/GameMenu.vue";
import TicTacToe from "../views/Games/TicTacToe.vue";

const routes = [
    {
        path: '/',
        component: Loading,
        children: [
            {
                path: '/',
                name: 'Loading',
                component: LoadingPage
            }
        ]
    },
    {
        path: '/home',
        component: Default,
        children: [
            {
                path: '/home',
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
