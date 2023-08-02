import { createRouter, createWebHistory } from "vue-router";
import Default from "../layouts/Default.vue";
import Home from "../views/Games/GameMenu.vue";
import TicTacToe from "../views/Games/TicTacToe.vue";
import Settings from "../views/Settings/Settings.vue"
import Shapes from "../views/Settings/Shapes.vue"

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
            },
            {
                path: '/settings',
                name: 'Settings',
                component: Settings
            },
            {
                path: '/settings/shapes',
                name: 'Shapes',
                component: Shapes
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
