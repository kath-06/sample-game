<template>
  <el-container>
    <main-header>
      <template #headerName>
        <span class="header-title-primary">
          meow
        </span>
      </template>
    </main-header>
    <el-main class="main-body-primary">
      <router-view />
    </el-main>
    <el-footer class="footer-primary" />
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