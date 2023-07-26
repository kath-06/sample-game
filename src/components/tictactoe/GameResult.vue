<template>
    <el-row class="m-8 text-2xl">
        <el-col :span="24">
            <span v-show="nextPlayer">
                Next Player: {{nextPlayer}}
            </span>
            <span v-show="gameResult">
                Game Result: {{gameResult}}
            </span>
        </el-col>
    </el-row>
</template>
<script lang ="ts" setup>
import { defineProps } from 'vue'

defineProps({
    nextPlayer: {
        type: String,
        default: ''
    },
    gameResult: {
        type: String,
        default: ''
    }
})
</script>