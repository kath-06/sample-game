<template>
    <el-header>
        <el-menu class="h-full" mode="horizontal" default-active="/">
            <el-menu-item class="text-3xl md:text-4xl font-bold flex justify-center align-center">
                <slot name="headerName">
                    Header Name
                </slot>
            </el-menu-item>
            <slot name="headerNav" />
        </el-menu>
    </el-header>
</template>