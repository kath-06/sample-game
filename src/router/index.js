import { createRouter, createWebHistory } from "vue-router";
import Default from "../layouts/Default.vue";
import TicTacToe from "../views/Games/TicTacToe.vue";
import Settings from "../views/Settings/Settings.vue";

const routes = [
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '/games/tictactoe',
                name: 'Games',
                component: TicTacToe
            },
            {
                path: '/settings',
                name: 'Settings',
                component: Settings
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
