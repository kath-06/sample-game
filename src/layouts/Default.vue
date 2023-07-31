<template>
  <el-container>
    <main-header class="fade-up-in">
      <template #headerName>
        <span class="header-title-primary">
          meow
        </span>
      </template>
    </main-header>
    <el-main class="main-body-primary fade-in animate-delay-500">
      <router-view />
    </el-main>
    <el-footer class="footer-primary fade-down-in" />
  </el-container>
</template>

<script lang="ts" setup name="Default">
import { ref } from 'vue';

// const navMenu = [
//   {
//     type: 'item',
//     text: 'Games',
//     link: '/',
//     icon: 'MagicStick'
//   }
// ]
</script>