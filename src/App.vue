<template>
  <el-config-provider namespace="ep">
    <router-view />
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
  height: 100%;
}

#app > * {
  height: 100%;
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}

html, body {
  height: 100%;
}

.ep-aside {
  width: 200px !important;
}
</style>
