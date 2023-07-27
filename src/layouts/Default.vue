<template>
  <el-container>
    <main-header>
      <template #headerName>
        <span class="flex bg-clip-text text-transparent bg-gradient-to-r from-sky-950 to-sky-500 text-center">
          meow
        </span>
      </template>
    </main-header>
    <el-main class="bg-sky-900 text-white">
      <router-view />
    </el-main>
    <el-footer class="bg-sky-950" />
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