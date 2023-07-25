<template>
    <span v-for="(menu, index) in navMenu" :key="index">
        <el-sub-menu v-show="menu.type === 'sub'" :index="menu.link">
            <template #title>
                <el-icon>
                    <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.text }}</span>
            </template>
            <span v-for="(sub, subIndex) in menu.subMenu" :key="subIndex">
                <el-menu-item :index="sub.link">
                    {{ sub.text }}
                </el-menu-item>
            </span>
        </el-sub-menu>
        <el-menu-item v-show="menu.type === 'item'" :index="menu.link">
            <el-icon>
                <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.text }}</span>
        </el-menu-item>
    </span>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
    navMenu: {
        type: Object,
        required: true
    }
})
</script>
