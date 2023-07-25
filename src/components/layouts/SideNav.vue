<template>
    <el-menu
        id="side-nav"
        mode="vertical"
        router
        :collapse="isCollapse"
        collapse-transition>
        <el-menu-item>LOGO</el-menu-item>
        <span v-for="(menu, index) in sidebarMenu" :key="index">
            <el-sub-menu v-if="menu.type" :index="menu.link">
                <template #title>
                    <el-icon>
                        <component :is="menu.icon"></component>
                    </el-icon>
                    <span>{{ menu.text }}</span>
                </template>
                <span v-for="(sub, subindex) in menu.subMenus" :key="subindex">
                    <el-menu-item :index="sub.link">
                        {{ sub.text }}
                    </el-menu-item>
                </span>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.link">
                <el-icon>
                    <component :is="menu.icon"></component>
                </el-icon>
                <span>{{ menu.text }}</span>
            </el-menu-item>
        </span>
    </el-menu>
</template>

<script lang="ts" setup>
    import { ref, defineProps } from 'vue';
    import { smallScreen } from "../../utils/responsive.js"

    let isCollapse = ref<Boolean>(false);

    defineProps({
        sidebarMenu: {
            type: Object,
            required: false,
            default: null
        }
    })

    window.addEventListener("resize", function () {
        if(smallScreen(1200)) {
            isCollapse.value = true;
        } else {
            isCollapse.value = false;
        }
    })
</script>

<style scoped>
a {
    text-decoration: none;
}
#side-nav {
    height: 100%;
}
#side-nav:not(.el-menu-collapse) {
    width: 200px !important;
}

@media (max-width: 1200px) {
    #side-nav {
        width: 70px !important;
    }
}
</style>