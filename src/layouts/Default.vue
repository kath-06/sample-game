<template>
  <el-container>
    <main-header v-show="!loading" class="fade-up-in">
      <template #headerName>
        <span class="header-title-primary">
          meow
        </span>
      </template>
      <template #headerNav>
        <div class="flex-grow" />
        <header-nav :navMenu="navMenu" />
      </template>
    </main-header>
    <el-main :class="loading ? 'main-body-light-primary' : 'main-body-primary fade-in animate-delay-500'">
      <div v-if="loading" class="page-container">
        <loading-page />
      </div>
      <router-view v-else />
    </el-main>
    <el-footer v-show="!loading" class="footer-primary fade-down-in" />
  </el-container>
</template>

<script lang="ts" setup name="Default">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const navMenu = [
  {
    type: 'item',
    text: 'Home',
    link: '/',
    icon: 'HomeFilled'
  },
  {
    type: 'item',
    text: 'Settings',
    link: '/settings',
    icon: 'Tools'
  }
]
const router = useRouter()

let loading = ref<boolean>(true)

const loadingTimeOut = () => {
    setTimeout(() => {
      loading.value = false
    }, 2500) 
}

onMounted(() => {
  loadingTimeOut()
})
</script>