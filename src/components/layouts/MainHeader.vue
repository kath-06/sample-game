<template>
    <el-header>
        <el-menu mode="horizontal" active-text-color="#740001" default-active="/">
            <el-menu-item class="header-name">
                <slot name="headerName">
                    Header Name
                </slot>
            </el-menu-item>
            <slot name="headerNav">
                <el-menu-item>Item A</el-menu-item>
            </slot>
        </el-menu>
    </el-header>
</template>
<style scoped>
.header-name {
    font-size: 30px;
    font-weight: 500;
    color: #740001;
    animation: color-change 60s infinite;
}

@keyframes color-change {
    0% { color: #740001; }
    25% { color: #ae0001; }
    50% { color: #eeba30; }
    75% { color: #d3a625; }
    90% { color: #000000; }
}
</style>