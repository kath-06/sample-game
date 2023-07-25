<template>
    <el-row class="mt-6 game-result">
        <el-col :span="12">
            <span>
                Next Player: {{nextPlayer}}
            </span>
        </el-col>
        <el-col :span="12">
            <span>
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
        default: '-'
    },
    gameResult: {
        type: String,
        default: '-'
    }
})
</script>
<style scoped>
.game-result {
    margin-top: 50px;
    font-size: 25px;
}
</style>