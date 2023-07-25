<template>
  <el-container>
    <main-header>
      <template #headerName>
        meow-meow
      </template>
      <template #headerNav>
        <header-nav :nav-menu="navMenu" />
      </template>
    </main-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer />
  </el-container>
</template>

<script lang="ts" setup name="Default">
import { ref } from 'vue';

const navMenu = [
  {
    type: 'sub',
    text: 'Games',
    link: '/',
    icon: 'MagicStick',
    subMenu: [
      { text: 'TicTacToe', link: '/' }
    ]
  }
]
</script>