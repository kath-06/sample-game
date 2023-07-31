<template>
    <div class="page-container">
        <loading-page />
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue"
import { useRouter } from 'vue-router'


const router = useRouter()

function loadingTimeOut () {
    setTimeout(() => {
        router.push('/home')
    }, 3000) 
}

onMounted(() => {
   loadingTimeOut()
})
</script>
