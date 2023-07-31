<template>
    <el-header>
        <el-menu class="h-full" mode="horizontal" default-active="/">
            <el-menu-item class="header-title">
                <slot name="headerName">
                    Header Name
                </slot>
            </el-menu-item>
            <slot name="headerNav" />
        </el-menu>
    </el-header>
</template>